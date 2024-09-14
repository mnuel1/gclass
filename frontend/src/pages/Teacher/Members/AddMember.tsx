import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'

import { MdDeleteOutline } from 'react-icons/md'

interface item {
    id: string,
    name: string,
    description: string
}

interface Member {
    name: string
}


const searchResults = ["John Doe", "Juan Dela Cruz", "Jose Marie Chan"]
export const AddMember:React.FC = () => {
    
    const [search, setSearch] = useState<string>('')
    const [members, setMembers] = useState<Member[]>([])

    const location = useLocation()        
    const classData : item = location.state.item

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleAddMembers = (name: string) => {
        if (!members.some(member => member.name === name)) {
            setMembers([...members, {name}])
        }
        setSearch('')
    } 

    const handleRemoveMember = (name: string) => {
        setMembers(members.filter(member => member.name !== name))                
    }
    
    const handleSave = () => {

    }

    
    return (
        <>

            <div className='flex h-full w-full'>
                <div className='w-[30%] bg-white '>
                    <ClassroomMenu item={classData}/>
                </div>
                <div className='w-[70%] bg-gray-200'>
                    <div className='border-b-2 border-gray-300 p-6 flex justify-between items-center '>
                        <h1 className='text-2xl font-bold'>{members.length <= 1 ? 'Add Member' : "Add Members"}</h1>                        
                    </div>

                    <div className='h-full p-4 m-6 flex flex-col gap-2'>
                        <div className='flex flex-col gap-6 overflow-hidden'>
                            
                            <div className='flex gap-4'>
                                <label className="font-bold">Add: </label>                            
                                <div className='flex items-center gap-2  w-fit relative'>
                                    
                                    <input type="text" value={search} onChange={handleSearchChange} className='outline-0 rounded-t-md p-2'/>

                                    <div className={search.length === 0 ? 'hidden' : 'absolute right-0 top-10 w-full bg-white p-2 z-50 shadow-lg'}>
                                        {searchResults.filter(result => result.toLowerCase().includes(search.toLowerCase()))
                                        .map((result, index) => (
                                            <div key={index}>
                                                <button type='button' onClick={() => handleAddMembers(result)}>{result}</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                                                
                            </div>
                            <div className='grow p-2 rounded-md bg-white overflow-y-auto'>
                                {!members.length ? (
                                    <div className='text-xl'> No members yet</div>
                                ) : ( 
                                    members.map((member, index) => (
                                        <div key={index} className='flex gap-2'>
                                            <button onClick={() => handleRemoveMember(member.name)} className=''>
                                                <MdDeleteOutline className='text-[red] text-2xl'/>
                                            </button>
                                            <span className='text-xl'>{index + 1}. {member.name}</span>
                                          
                                        </div>
                                    ))
                                )}
                            </div>

                            <div>
                                <button 
                                type='button' 
                                className='bg-gray-600 p-2 rounded-md w-[10rem] text-white hover:bg-gray-700'> 
                                Save </button>
                            </div>

                        </div>
                            
                    
                            
                           
                      
                    </div>

                </div>

                


            </div>


        
        
        </>
    )

}

