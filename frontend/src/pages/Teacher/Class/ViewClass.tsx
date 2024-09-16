import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { ClassroomTypes } from '../../../types/classroomTypes'
import { useActivityQuery } from '../../../hooks/useActivityQuery'
import useActivityStore from '../../../store/Teacher/Activity/useActivityStore'
import useModalStore from '../../../store/Teacher/Modal/useModalStore'
import { Authentication } from '../../../Auth/Authentication'

import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { PostBlock } from '../../../components/PostbBock/PostBlock'
import { ErrorAlert } from '../../../components/Alert/ErrorAlert'
import { Spinner } from '../../../components/Spinner/spinner'


export const ClassroomView:React.FC = () => {
    // const { getUser } = Authentication()
    const name = "Teacher Name"
    const location = useLocation()
    const classData : ClassroomTypes = location.state.item
    
    const { data, isSuccess, isError, isLoading } = useActivityQuery(classData.class_id);
    const { activity, getActivity } = useActivityStore()
    const {    
        isErrorAlertVisible,
        showErrorAlert,
        hideErrorAlert } = useModalStore()
        
    const handleScheduleMeeting = () => {
        // navigate(`/teacher/class/${classData.id}/assignments/new`, {state:{item}})
        // alert('yes')
    }
    useEffect(() => {
        
        if (isSuccess && data) {          
            getActivity(data);  
            console.log(activity);
                      
        }

        if (isError) {            
            showErrorAlert()
        }
    }, [data, isSuccess, getActivity, isError]);
    return (
        <>
            {isErrorAlertVisible && <ErrorAlert isVisible={isErrorAlertVisible} onClose={hideErrorAlert} title={"Server Error"} 
            body={"An issue occurred. Please try again later. If the problem continues, please contact customer service. Thank you."}/>}
            <Spinner isLoading={isLoading || isError}>
                <div className='flex h-full w-full'>

                    <div className='w-[30%] bg-white h-full'>
                        <ClassroomMenu item={classData}/>
                    </div>

                    <div className='w-[70%] bg-white'>
                        <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
                        
                            <h1 className='text-2xl font-bold'>{classData.name}'s Posts</h1>
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

                            {Object.keys(activity).length !== 0 ? (
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
                                    <h1> No post yet...</h1>
                                </>
                            )}
                            

                           
                            
                        </div>

                    </div>

                    


                </div>
            </Spinner>

        
        
        </>
    )


}