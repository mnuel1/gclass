import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { Accordion } from '../../../components/Accordion/Accordion'
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
export const RemoveMember:React.FC = () => {
    
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
                <div className='w-[70%] bg-white'>
                    <div className='border-b-2 border-gray-300 p-6 flex justify-between items-center '>
                        <h1 className='text-2xl font-bold'>{members.length <= 1 ? 'Remove Member' : "Remove Members"}</h1>                        
                    </div>

                    <div className='p-4 m-6 flex flex-col gap-2'>
                        <div className='flex flex-col gap-6 overflow-hidden'>
                            
                            <div className='flex items-center gap-4 border bg-gray-200 rounded-lg p-4'>
                                <label className="font-bold">Enter name: </label>                            
                                <div className='flex items-center gap-2  w-fit relative'>
                                    
                                    <input type="text" value={search} onChange={handleSearchChange} className='outline-0 rounded-sm p-2 border border-gray-200'/>

                                    <div className={search.length === 0 ? 'hidden' : 'absolute right-0 top-10 w-full bg-white z-50 shadow-lg border border-gray-200'}>
                                        {searchResults.filter(result => result.toLowerCase().includes(search.toLowerCase()))
                                        .map((result, index) => (
                                            <div key={index} className='hover:bg-gray-200 p-4 border-b border-gray-100'>
                                                <button 
                                                    type='button' 
                                                    onClick={() => handleAddMembers(result)}
                                                    >
                                                        {result}
                                                    </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white overflow-y-auto'>
                                <Accordion name='Members'>
                                    {!members.length ? (
                                        <div className='text-xl my-2 p-4 '> No members yet</div>
                                    ) : (
                                        
                                        members.map((member, index) => (
                                            <>
                                                <div key={index} className='flex gap-2 p-4 '>
                                                    <button onClick={() => handleRemoveMember(member.name)} className=''>
                                                        <MdDeleteOutline className='text-[red] text-2xl'/>
                                                    </button>
                                                    <span className='text-xl'>{index + 1}. {member.name}</span>
                                                </div>
                                            </>
                                        ))
                                    )}
                                </Accordion> 
                            </div>

                            <div className='border-t border-gray-200 p-2'>
                                <button 
                                type='button' 
                                className='bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600'> 
                                Save </button>
                            </div>

                        </div>
                            
                    
                            
                           
                      
                    </div>

                </div>

                


            </div>


        
        
        </>
    )

}

