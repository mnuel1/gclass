import React, { useState, useEffect } from 'react'
import { api } from '../../../process/axios'
import { useLocation } from 'react-router-dom'
import { Accordion } from '../../../components/Accordion/Accordion'

import { Member } from '../../../process/Member/memberType'
import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'
import { FailedToast } from '../../../components/Toast/FailedToast'
import useModalStore from '../../../process/Modal/useModalStore'
import { useAddMember } from '../../../process/Member/useMemberQuery'

export const AddMember:React.FC = () => {
        
    const [search, setSearch] = useState<string>('')
    const [members, setMembers] = useState<Member[]>([])
    const [searchResults, setSearchResults] = useState<Member[]>([]);
    const {isLoading, startLoading, stopLoading} = useModalStore()
    
    const location = useLocation()        
    const classroom : ClassroomTypes = location.state.classroom
        
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleAddMembers = (member: Member) => {
        if (!members.some(existingMember => existingMember.student_id === member.student_id)) {
            setMembers([...members, member]);
        }
        setSearch('');
        setSearchResults([]); // Clear search results after adding
    };

    const handleRemoveMember = (student_id: string) => {
        setMembers(members.filter(member => member.student_id !== student_id))                
    }
    

    const searchStudents = async (searchTerm: string) => {
        if (searchTerm.length < 2) {
            setSearchResults([]); // Clear results if search term is too short
            return;
        }        
        startLoading();
        try {
            const response = await api.get(`/search/students/${searchTerm}/${classroom.class_id}`);
                       
            const data = response.data.data;
            if (response.status === 200) {
                setSearchResults(data); // Assuming the response structure
            } else {
                setSearchResults([]); // Clear results if not found
            }
        } catch (error) {
            console.error("Search error:", error);
            FailedToast("Something went wrong")
            setSearchResults([]);
        } finally {
            stopLoading();
        }
    };

    // Effect to trigger search when `search` changes
    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            searchStudents(search);
        }, 500); // Debounce for 300ms
                
        return () => clearTimeout(debounceSearch);
    }, [search]);

    const addMembersMutation = useAddMember()
    const handleSave = () => {
        console.log(classroom);
        
        const data = {
            class_id: classroom.class_id,
            members: members
        }
        
        addMembersMutation.mutate(data)
        
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
                            
                            <input autoComplete={"false"}
                                
                            type="text" value={search} onChange={handleSearchChange} className='outline-0 rounded-sm p-2 border border-gray-200'/>

                            <div className={search.length === 0 ? 'hidden' : 'absolute right-0 top-10 w-full bg-white z-50 shadow-lg border border-gray-200'}>
                            {search.length > 0 && (                               
                                    isLoading ? (
                                        <div className='p-2'>Loading...</div>
                                    ) : (                                                                              
                                            searchResults ? (
                                                searchResults.map((member) => (
                                                    <div className='hover:bg-gray-200 p-4 border-b border-gray-100'>
                                                    <button 
                                                        type='button'
                                                        key={member.student_id}
                                                        onClick={() => handleAddMembers(member)}
                                                        className='p-2 hover:bg-gray-200 cursor-pointer'
                                                    >
                                                        {member.fullname}
                                                    </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='p-2'>No results found</div>
                                            )                                                                  
                                    )
                                
                            )}
                            </div>
                        </div>
                    </div>
                    <div className='bg-white overflow-y-auto'>
                        <Accordion name='New Members'>
                            {!members.length ? (
                                <div className='text-xl my-2 p-4 '> No new members yet</div>
                            ) : (
                                
                                members.map((member, index) => (
                                    <>
                                        <div key={index} className='flex gap-2 p-4 '>
                                            <button onClick={() => handleRemoveMember(member.student_id)} className=''>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                            <span className='text-xl'>{member.fullname}</span>
                                        </div>
                                    </>
                                ))
                            )}
                        </Accordion> 
                    </div>

                    <div className='border-t border-gray-200 p-2'>
                        <button 
                        onClick={handleSave}
                        type='button' 
                        className='bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600'> 
                        Save </button>
                    </div>

                </div>
                                                                                
            </div>        
        
        </>
    )

}

