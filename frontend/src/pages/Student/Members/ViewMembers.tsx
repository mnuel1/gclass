import React, { useEffect }from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useMemberStore from '../process/Member/useMemberStore'
import { useMemberQuery } from '../process/Member/useMemberQuery'
import useModalStore from '../../../process/Modal/useModalStore'
import { Authentication } from '../../../Auth/Authentication'

import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'

import { FailedToast } from '../../../components/Toast/FailedToast'
import { Accordion } from '../../../components/Accordion/Accordion'


export const StudentMembers:React.FC = () => {

    const location = useLocation()
    const navigate = useNavigate()    
    const classroom : ClassroomTypes = location.state.classroom
    
    const { data, isSuccess, isError, isLoading } = useMemberQuery(classroom.class_id);
    const { member, getMember } = useMemberStore()
    const {    
        startLoading,
        stopLoading } = useModalStore()

       
    useEffect(() => {
        if (isLoading){
            startLoading()
        } else {
            stopLoading()
        }
        if (isSuccess && data) {          
            getMember(data);                        
        }

        if (isError) {            
            FailedToast("Something went wrong!")
        }
    }, [data, isSuccess, getMember, isError]);

    return (
        <>
            
            <div className='flex md:items-center justify-between flex-col md:flex-row gap-4 md:gap-0 
                border-b-2 border-gray-300 px-8 py-4'>            
                <h1 className='text-2xl font-bold'>{`${classroom.name}'s Members`.toUpperCase()}</h1>    
            </div>
            

            <div className='p-4 m-6 bg-white grow'>        
                <div className='flex flex-col gap-4 p-2'>
                    <div className='flex border-b-2 border-gray-300'>
                        <span className='text-[11px] text-gray-400'>Teacher</span>                            
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <div className='rounded-full w-[40px] flex justify-center p-2 
                            bg-blue-300 font-bold flex-none self-start'> {classroom.teacher_name.charAt(0).toUpperCase()} </div>
                            <span className='font-semibold'>{classroom.teacher_name}</span>
                        </div>

                        <div>
                            
                        </div>
                    </div>
                    
                    
                    
                </div>
                                                                    
                <div className='border-b-2 border-gray-300 my-2 '/>                            
                <Accordion name={`${member.length === 0 ? '' : member.length} Students`}>

                    {member.length !== 0 ? (
                        member.map((student, index) => (
                        <>       
                            <div key={index} className='flex items-center justify-between my-2 p-2 '>
                                <div className='flex gap-2 items-center '>
                                    <div className='rounded-full w-[40px] flex justify-center p-2 
                                    bg-blue-300 font-bold flex-none self-start'> {student.fullname[0].toUpperCase()} </div>
                                    <span className='font-semibold'>{student.fullname} </span>
                                </div>

                                <span className='text-xs text-gray-400'>{student.created_time}</span>
                            </div>                                                                
                        </>                      
                    ))): (
                        <h1 className='m-2 p-2 text-gray-400 text-sm'> No members yet.
                        </h1>
                    )}
                </Accordion>
            </div>

        </>
    )

}

