import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Authentication } from '../../../Auth/Authentication'
import { useActivityQuery } from '../../../process/Activity/useActivityQuery'
import useActivityStore from '../../../process/Activity/useActivityStore'
import useModalStore from '../../../process/Modal/useModalStore'

import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'

import { PostBlock } from '../../../components/PostBlock/PostBlock'
import { FailedToast } from '../../../components/Toast/FailedToast'

export const StudentClassroomView: React.FC = () => {
    // const { getUser, getID } = Authentication()
   
    const location = useLocation();

    const classroom : ClassroomTypes = location.state.classroom
    
    const { data, isSuccess, isError, isLoading, isEmpty } = useActivityQuery(classroom.class_id);
    const { activity, getActivity } = useActivityStore()
    const {
        startLoading,
        stopLoading } = useModalStore()
        
    
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
            </div>
            
            <div className='pb-24 pl-4 pr-4 pt-4 m-6 overflow-y-auto h-full'>

                {!isEmpty ? (
                    Object.entries(activity).map(([startDate, act]) => (
                    <>
                        <div key={startDate} className='flex justify-center items-center border-b-2 border-gray-300'>
                            <span className='text-[11px] text-gray-400'>{startDate}</span>
                        </div>

                        {Array.isArray(act) && act.map((act, index) => (
                                <PostBlock 
                                key={index} 
                                teacher_name={classroom.teacher_name}
                                posts={act.posts}
                                formatted_created_time={act.formatted_created_time}
                                link={act.link}
                            />
                        ))}
                    </>
                ))) : (
                    <>
                        <h1 className='m-2 p-2 text-gray-400 text-sm'> No post yet.
                        </h1>
                    </>
                )}                                                
            </div>
           

            
        
        
        </>
    )


}