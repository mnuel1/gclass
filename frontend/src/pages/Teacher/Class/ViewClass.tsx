import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Authentication } from '../../../Auth/Authentication'
import { useActivityQuery } from '../../../process/Activity/useActivityQuery'
import useActivityStore from '../../../process/Activity/useActivityStore'
import useModalStore from '../../../process/Modal/useModalStore'

import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'

import { PostBlock } from '../../../components/PostBlock/PostBlock'
import { FailedToast } from '../../../components/Toast/FailedToast'


export const ClassroomView: React.FC = () => {
    const { getUser } = Authentication()
    const name = getUser()

    const location = useLocation();

    const classroom : ClassroomTypes = location.state.classroom
    
    const { data, isSuccess, isError, isLoading, isEmpty } = useActivityQuery(classroom.class_id);
    const { activity, getActivity } = useActivityStore()
    const {
        startLoading,
        stopLoading } = useModalStore()
        
    const handleScheduleMeeting = () => {
        stopLoading()
        // navigate(`/teacher/class/${classData.id}/assignments/new`, {state:{item}})
        // alert('yes')
    }
    
    useEffect(() => {
        if (isLoading) {
            startLoading()
        } else {
            stopLoading()
        }
        if (isSuccess && data) {          
            getActivity(data);                                    
        }
        if (isError) {            
            FailedToast("Something went wrong!")
        }
    }, [data, isSuccess, getActivity, isError]);

    
    return (
        <>                              
            <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
            
                <h1 className='text-2xl font-bold'>{`${classroom.name}'s Posts`.toUpperCase()}</h1>
                <button 
                    type='button' 
                    className='p-2 rounded-md text-black flex 
                    items-center gap-2 hover:bg-blue-200 border border-gray-300'
                    onClick={handleScheduleMeeting}
                    > 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>

                    Meet Now
                </button>
            </div>
            
            <div className='p-4 m-6'>

                {!isEmpty ? (
                    Object.entries(activity).map(([startDate, act]) => (
                    <>
                        <div key={startDate} className='flex justify-center items-center border-b-2 border-gray-300'>
                            <span className='text-[11px] text-gray-400'>{startDate}</span>
                        </div>

                        {Array.isArray(act) && act.map((act, index) => (
                                <PostBlock 
                                key={index} 
                                teacher_name={name}
                                posts={act.posts}
                                formatted_created_time={act.formatted_created_time}
                            />
                        ))}
                        
                    </>
                ))) : (
                    <>
                        <h1 className='m-2 p-2 text-gray-400 text-sm'> No post yet. <br /> 
                            Create a post by creating an assignment or creating/scheduling a meeting.
                        </h1>
                    </>
                )}
                

                
                
            </div>

            
        
        
        </>
    )


}