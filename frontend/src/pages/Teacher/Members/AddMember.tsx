import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { Accordion } from '../../../components/Accordion/Accordion'

import useMemberStore from '../../../process/Member/useMemberStore'
import { Member } from '../../../process/Member/memberType'
import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'


export const AddMember:React.FC = () => {
        
    const [search, setSearch] = useState<string>('')
    const [members, setMembers] = useState<Member[]>([])

    const location = useLocation()        
    const classroom : ClassroomTypes = location.state.classroom
   
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleAddMembers = (memberr: Member) => {
        if (!members.some(member => member.student_id === memberr.student_id)) {
            setMembers([...members, memberr])
        }
        setSearch('')
    } 

    const handleRemoveMember = (student_id: string) => {
        setMembers(members.filter(member => member.student_id !== student_id))                
    }
    
    const handleSave = () => {

    }

    
    return (
        <>

    
            <div className='border-b-2 border-gray-300 p-6 flex justify-between items-center '>
                <h1 className='text-2xl font-bold'>{members.length <= 1 ? 'Add Member' : "Add Members"}</h1>                        
            </div>

            <div className='p-4 m-6 flex flex-col gap-2'>
                <div className='flex flex-col gap-6 overflow-hidden'>
                    
                    <div className='flex items-center gap-4 border bg-gray-200 rounded-lg p-4'>
                        <label className="font-bold">Enter name: </label>                            
                        <div className='flex items-center gap-2  w-fit relative'>
                            
                            <input type="text" value={search} onChange={handleSearchChange} className='outline-0 rounded-sm p-2 border border-gray-200'/>

                            <div className={search.length === 0 ? 'hidden' : 'absolute right-0 top-10 w-full bg-white z-50 shadow-lg border border-gray-200'}>
                                {/* {member
                                    .filter(student => student.fullname.toLowerCase().includes(search.toLowerCase()))
                                    .map((student, index) => (
                                        <div key={index} className='hover:bg-gray-200 p-4 border-b border-gray-100'>
                                            <button 
                                                type='button' 
                                                onClick={() => handleAddMembers(student)}
                                            >
                                                {student.fullname}
                                            </button>
                                        </div>
                                    ))
                                } */}
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
                                            <button onClick={() => handleRemoveMember(member.student_id)} className=''>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                            <span className='text-xl'>{index + 1}. {member.fullname}</span>
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
        
        </>
    )

}

