import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import useModalStore from '../../../store/Teacher/Modal/useModalStore'
import useAssignmentStore from '../../../store/Teacher/Assignment/useAssignmentStore'
import { useAssignmentQuery } from '../../../hooks/useAssignmentQuery'

import { ClassroomTypes } from '../../../types/classroomTypes'

import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'

import { Spinner } from '../../../components/Spinner/spinner'
import { ErrorAlert } from '../../../components/Alert/ErrorAlert'

import { Textfield } from '../../../components/Fields/textfield'
import { Textarea } from '../../../components/Fields/textarea'
import { Attachment } from '../../../components/Fields/attachment'
import { DateField } from '../../../components/Fields/date'
import { NumberField } from '../../../components/Fields/numberfield'

export const ViewAssignment:React.FC = () => {
    const [edit, setEdit] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()    
    const item : ClassroomTypes = location.state.item
        
    const { data, isSuccess, isError, isLoading } = useAssignmentQuery(item.class_id);
    const { assignment, getAssignment } = useAssignmentStore()
    const {    
        isErrorAlertVisible,
        showErrorAlert,
        hideErrorAlert } = useModalStore()

    // const handleFilter = (name : string) => {
    //     setActive(name)
    // }
       
    const handleEditAssignment = () => {
        setEdit(prev => !prev)
    }

    const handleRemoveAssignment = () => {

    }

    useEffect(() => {
        
        if (isSuccess && data) {          
            getAssignment(data);            
        }

        if (isError) {            
            showErrorAlert()
        }
    }, [data, isSuccess, getAssignment, isError]);
    return (
        <>
            {isErrorAlertVisible && <ErrorAlert isVisible={isErrorAlertVisible} onClose={hideErrorAlert} title={"Server Error"} 
            body={"An issue occurred. Please try again later. If the problem continues, please contact customer service. Thank you."}/>}
            <Spinner isLoading={isLoading || isError}>
                <div className='flex h-full w-full'>
                    <div className='w-[30%] bg-white '>
                        <ClassroomMenu item={item}/>
                    </div>

                    <div className='w-[70%] bg-white'>
                        <div className='flex items-center justify-between border-b-2 border-gray-300 p-4'>
                        
                            <h1 className='text-2xl font-bold'>{item.name}'s Assignment</h1>
                            <div className='flex gap-2'>
                                <button 
                                    type='button' 
                                    className='p-2 rounded-md text-black flex 
                                    items-center gap-2 hover:bg-blue-200 border border-gray-300'
                                    onClick={handleEditAssignment}
                                    > 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>


                                    Edit Assignment
                                </button>
                                <button 
                                    type='button' 
                                    className='p-2 rounded-md text-black flex 
                                    items-center gap-2 hover:bg-red-300 bg-red-200  '
                                    onClick={handleRemoveAssignment}
                                    > 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>

                                    <span className='text-red-800'> Delete Assignment</span>
                                </button>
                            </div>
                            
                        </div>
                        

                        <div className='h-full p-4 m-6 flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <span className='text-sm text-gray-500'>Title <span className='text-red-700'>*</span> </span>
                                <Textfield />
                            </div>

                            
                            <Textarea name="Instructions"/>
                            <div className='flex flex-col gap-2'>
                                <span className='text-xs italic text-gray-400'>Add files if neccessary</span>
                                <Attachment/>
                            </div>
                            
                            <div className='flex flex-col md:flex-row items-center gap-4'>

                                <div className='flex flex-col gap-2'>
                                    <span className='text-sm text-gray-500'>Points <span className='text-red-700'>*</span> </span>
                                    <NumberField />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-sm text-gray-500'>Due Date <span className='text-red-700'>*</span> </span>
                                    <DateField /> 
                                </div>
                                
                            

                            </div>
                                                                            
                            <button
                                disabled = {edit ? false : true} 
                                type='button' 
                                className={`${edit ? 'cursor-pointer' : 'cursor-not-allowed bg-gray-500 hover:bg-gray-500'} 
                                bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600 mt-2`}> 
                                Save </button>
                        </div>

                    </div>                
                </div>
            </Spinner>
        </>
    )

}

