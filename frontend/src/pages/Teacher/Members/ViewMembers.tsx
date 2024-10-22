import React, { useEffect, useState }from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../../process/axios'
import useMemberStore from '../../../process/Member/useMemberStore'
import { useMemberQuery, useAddMember, useRemoveMember } from '../../../process/Member/useMemberQuery'
import useModalStore from '../../../process/Modal/useModalStore'
import { Authentication } from '../../../Auth/Authentication'

import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'

import { FailedToast } from '../../../components/Toast/FailedToast'
import { Accordion } from '../../../components/Accordion/Accordion'


export const PendingMembers = ({class_id}) => {

    const [ member, getMember ] = useState([])

    const {startLoading, stopLoading} = useModalStore()
    useEffect(() => {
        const getPendingMembers = async () => {
            try {
                startLoading();
                                   
                const response = await api.get(`/teacher/pending/member/${class_id}`,);
                
                if (response.status !== 200) {
                  FailedToast("Something went wrong");
                  stopLoading();
                  return;
                }                
                getMember(response.data.data)
                            
                stopLoading();
            } catch (error) {
                console.error('Error fetching teachers:', error);
                FailedToast("An error occurred while fetching teachers.");
                stopLoading();
            }
        }
        getPendingMembers()
        
    }, []);

    const addMembersMutation = useAddMember()
    const handleAddSave = (id, student) => {
                
        const data = {
            class_id: id,
            members: [student]
        }
        console.log(data);
        addMembersMutation.mutate(data)
        
        
    }

    const removeMemberMutation = useRemoveMember()
    const handleRemoveSave = (id, student) => {
        
        const data = {
            class_id: id,            
            members: [student]
        }
        console.log(data);
        
        removeMemberMutation.mutate(data)        
        window.location.reload()
    }   

    return (
        <Accordion name={`Students requesting to join: ${member.length === 0 ? '' : member.length}`}>
            {member.length !== 0 ? (
                member.map((student, index) => (
                <>       
                    <div key={index} className='flex items-center justify-between my-2 p-2 '>
                        <div className='flex gap-2 items-center '>
                            <div className='rounded-full w-[40px] flex justify-center p-2 
                            bg-green-400 font-bold flex-none self-start'> {student.fullname[0].toUpperCase()} </div>
                            <span className='font-semibold'>{student.fullname} </span>
                        </div>

                        <div className='flex gap-4'>
                            <button 
                                className='px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700' 
                                onClick={() => handleAddSave(class_id, student)}>
                                    Accept
                            </button>
                            <button 
                                className='px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700' 
                                onClick={() => handleRemoveSave(class_id, student)}>
                                    Reject
                            </button>

                        </div>
                    </div>                                                                
                </>                      
            ))): (
                <></>
            )}
        </Accordion>
    )
}

export const Members:React.FC = () => {
    const { getUser } = Authentication()
    const name = getUser()
    // const [active, setActive] = useState("pending")
    const location = useLocation()
    const navigate = useNavigate()    
    const classroom : ClassroomTypes = location.state.classroom
    
    const { data, isSuccess, isError, isLoading } = useMemberQuery(classroom.class_id);
    
    const { member, getMember } = useMemberStore()
    const {    
        startLoading,
        stopLoading } = useModalStore()
  
    const handleAddMember = () => {
        stopLoading()
        navigate(`new`, {state:{ classroom: classroom}})
    }

    const handleRemoveMember = () => {
        stopLoading()
        navigate(`remove`, {state:{ member: member, classroom: classroom}})
    }

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
                <div className='flex gap-2'>

                    <button 
                        type='button' 
                        className='p-2 rounded-md text-black flex 
                        items-center gap-2 hover:bg-blue-200 border border-gray-300'
                        onClick={handleAddMember}
                        > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add Member
                    </button>
                    <button 
                        type='button' 
                        className='p-2 rounded-md text-black flex 
                        items-center gap-2 hover:bg-red-300 bg-red-200  '
                        onClick={handleRemoveMember}
                        > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-800">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>

                        <span className='text-red-800'> Remove Member </span>
                    </button>

                </div>
                
            </div>
            

            <div className='p-4 m-6 bg-white grow'>          
                <div className='flex flex-col gap-4 p-2'>
                    <div className='flex border-b-2 border-gray-300'>
                        <span className='text-[11px] text-gray-400'>Teacher</span>                            
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <div className='rounded-full w-[40px] flex justify-center p-2 bg-[green] font-bold flex-none self-start'> T </div>
                            <span className='font-semibold'>{name}</span>
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
                                    bg-green-400 font-bold flex-none self-start'> {student.fullname[0].toUpperCase()} </div>
                                    <span className='font-semibold'>{student.fullname} </span>
                                </div>

                                <span className='text-xs text-gray-400'>{student.created_time}</span>
                            </div>                                                                
                        </>                      
                    ))): (
                        <h1 className='m-2 p-2 text-gray-400 text-sm'> No members yet.  
                            <span onClick={handleAddMember} 
                                className='cursor-pointer text-blue-500 hover:text-blue-600 m-2 font-semibold'>
                                You can add your students here.
                            </span>
                        </h1>
                    )}
                </Accordion>

                <PendingMembers class_id={classroom.class_id}/>
            </div>

        </>
    )

}

