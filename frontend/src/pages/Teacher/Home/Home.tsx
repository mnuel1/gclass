import React, { useEffect, useState } from 'react'

import useModalStore from '../../../process/Modal/useModalStore'
import useClassroomStore from '../../../process/Classroom/useClassroomStore'

import { useClassroomQuery, useAddClassroom } from '../../../process/Classroom/useClassroomQuery'

import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'
import { Classroom } from '../../../components/Classroom/Classroom'
import { ClassModal } from '../../../components/Modal/ClassModal'
import { FailedToast } from '../../../components/Toast/FailedToast'

export const Home:React.FC = () => {
    const itemsPerPage = 10; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    
    const { data, isSuccess, isError, isLoading } = useClassroomQuery();
    const addClassroomMutation = useAddClassroom(); 

    const { classrooms, getClassrooms } = useClassroomStore();
    const {
        classModalOpen, 
        openClassModal, 
        closeClassModal,
        startLoading, 
        stopLoading } = useModalStore()
    
    const submitHandler = (data: ClassroomTypes) => {                
        addClassroomMutation.mutate(data);
    };

    const totalPages = Math.ceil(classrooms.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentClassrooms = classrooms.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber : number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    useEffect(() => {

        if (isLoading) {
            startLoading()
        } else {
            stopLoading()
        }
        
        if (isSuccess && data) {          
          getClassrooms(data);                  
        }

        if (isError) {            
            FailedToast("Something went wrong!")
        }

    
      }, [data, isSuccess, getClassrooms, isError]);
    
    useEffect(() => {
        if (currentClassrooms.length === 0 && classrooms.length > 0) {
            // Adjust the page when there are no classrooms on the current page
            handlePageChange(currentPage !== 1 ? currentPage - 1 : currentPage + 1);
        }
    }, [currentClassrooms, classrooms, currentPage, handlePageChange]);
          
    return(
        <>
            
            {classModalOpen && <ClassModal onClose={closeClassModal} onSubmit={submitHandler}/>}
          
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
                        </div>
                        
                    </div>
                </div>
                <div className='flex flex-wrap gap-4 flex-col md:flex-row p-6 bg-white grow'>
                    {classrooms.length === 0 ? (
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
                    ) : (
                        currentClassrooms.length === 0 ? (
                            <h1 className='text-lg'>No classes available on this page.</h1>
                        ) : (
                            currentClassrooms.map((item, index) => (
                                <Classroom key={index} classroom={item} />
                            ))
                        )
                    )}
                </div>
                <div className='flex justify-center p-6'>
                    <ol className="flex gap-1 text-xs font-medium">
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                            >
                                <span className="sr-only">Prev Page</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>

                        {[...Array(totalPages).keys()].map((pageNumber) => (
                            <li key={pageNumber + 1}>
                                <button
                                    onClick={() => handlePageChange(pageNumber + 1)}
                                    className={`block size-8 rounded text-center leading-8 ${currentPage === pageNumber + 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border border-gray-100 bg-white text-gray-900'}`}
                                >
                                    {pageNumber + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                            >
                                <span className="sr-only">Next Page</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    </ol>
                </div>
            </div>
               
            
        </>
    )
}

