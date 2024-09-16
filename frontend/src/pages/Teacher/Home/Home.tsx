import React, { useEffect } from 'react'

import useModalStore from '../../../store/Teacher/Modal/useModalStore'
import useClassroomStore from '../../../store/Teacher/Classroom/useClassroomStore'

import { useClassroomQuery } from '../../../hooks/useClassroomQuery'
import { Authentication } from '../../../Auth/Authentication'

import { Classroom } from '../../../components/Classroom/Classroom'
import { ClassModal } from '../../../components/Modal/ClassModal'
import { JoinModal } from '../../../components/Modal/JoinModal'
import { Spinner } from '../../../components/Spinner/spinner'
import { ErrorAlert } from '../../../components/Alert/ErrorAlert'


export const Home:React.FC = () => {
    // const { getID } = Authentication()
    const id = '1'
    const { data, isSuccess, isError, isLoading } = useClassroomQuery(id);

    const { classrooms, getClassrooms } = useClassroomStore();
    const {
        classModalOpen, 
        joinModalOpen, 
        openClassModal, 
        closeClassModal,
        openJoinModal, 
        closeJoinModal,
        isErrorAlertVisible,
        showErrorAlert,
        hideErrorAlert } = useModalStore()
    
    

    useEffect(() => {
        
        if (isSuccess && data) {          
          getClassrooms(data);                  
        }

        if (isError) {            
            showErrorAlert()
        }
      }, [data, isSuccess, getClassrooms, isError]);
        
          
    return(
        <>
            {isErrorAlertVisible && <ErrorAlert isVisible={isErrorAlertVisible} onClose={hideErrorAlert} title={"Server Error"} 
            body={"An issue occurred. Please try again later. If the problem continues, please contact customer service. Thank you."}/>}
            {classModalOpen && <ClassModal onClose={closeClassModal} id=''/>}
            {joinModalOpen && <JoinModal onClose={closeJoinModal} id=''/>}
           
                <Spinner isLoading={isLoading || isError}>
                    <div className='flex flex-col'>                    
                        <div className='bg-white'>
                            <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
                            
                                <h1 className='text-2xl font-bold'>Classes</h1>
                                <div className='flex gap-2'>

                                    <button
                                        onClick={openClassModal}
                                        type='button' 
                                        className='flex items-center hover:bg-blue-200 rounded-lg p-2 gap-2 border border-gray-300 hover:border-blue-200'                        
                                        > 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                        strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>

                                        Create Class
                                    </button>
                                    <button
                                        onClick={openJoinModal}
                                        type='button' 
                                        className='flex items-center hover:bg-blue-200 rounded-lg p-2 gap-2 border border-gray-300 hover:border-blue-200'                        
                                        > 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                        </svg>

                                        Join Class
                                    </button>

                                </div>
                                
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-4 flex-col md:flex-row p-6 bg-white grow'>

                            {classrooms.length === 0 ? (
                                <>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-lg'>No classes yet. Start creating one now.</h1> 
                                        <button
                                            onClick={openClassModal}
                                            type='button' 
                                            className='flex items-center bg-blue-200 hover:bg-blue-300 rounded-lg p-2 gap-2'
                                            > 
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                            strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>

                                            Create Class
                                        </button>
                                    </div>
                                    
                                
                                </>
                            ) : (
                                <>
                                    {classrooms.map((item, index) => (                    
                                        <Classroom key={index} ClassroomTypes={item}/>                    
                                    ))} 
                                </>
                            )}
                        </div>
                    </div>
                </Spinner>
            
        </>
    )
}

