import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'
import { AssignmentType } from '../../../process/Assignment/assignmentType'
import useModalStore from '../../../process/Modal/useModalStore'
import { FailedToast } from '../../../components/Toast/FailedToast'
import { SERVER } from '../../../process/axios'
import { Accordion } from '../../../components/Accordion/Accordion'
import { Authentication } from '../../../Auth/Authentication'
import { SuccessToast } from '../../../components/Toast/SuccessToast'
import { ConfirmModal } from '../../../components/Modal/ConfirmModal'

interface ErrorsState {
    attachment?: string;
}

export const StudentViewAssignment:React.FC = () => {
    const { getID } = Authentication()
    const location = useLocation()
    const navigate = useNavigate()    
    const classroom : ClassroomTypes = location.state.classroom
    const ass : AssignmentType = location.state.assignment    
    const [errors, setErrors] = useState<ErrorsState>({})
    const [form,setForm] = useState({        
        attachment: ass.attachment,     
    })
    const [edit, setEdit] = useState(false)    
    const [confirm, setConfirm] = useState(false)
    
    const {startLoading, stopLoading} = useModalStore()
        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'file') {            
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files ? fileInput.files[0] : null;
            setForm(prevForm => ({
                ...prevForm,
                ["attachment"]: file,
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };
   

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (form.attachment.length <= 0) {
            newErrors.attachment = "Attach your answers here.";
        }
        
        return newErrors;
    };


    const handleSubmit = async () => {
        // e.preventDefault();
        const validationErrors = validate();
                
        if (Object.keys(validationErrors).length === 0) {         

            const formData = new FormData();
            formData.append('assignment_id', ass.assignment_id);
            formData.append('student_id', getID()); 
            formData.append('status', ass.assignment_status);
            formData.append('attachment', form.attachment);
                                    
            try {
                startLoading()
                const response = await fetch("http://localhost:4000/student/upload/assignment", 
                    {
                        method:'POST',
                        body: formData
                    }
                )

                if (response.status === 201) {
                    FailedToast("You cannot submit the assignment because the due date has passed.")
                    stopLoading()
                    return;
                }
                    
                if (response.status === 200) {
                    SuccessToast("Assignment Submitted!")                    
                    stopLoading()
                    window.location.reload()
                    navigate(-1)
                  
                } else {                    
                    FailedToast("Submit assignment failed!")
                    stopLoading()
                }
                
            } catch (error) {
                FailedToast("Something went wrong!")
                stopLoading()
            }

        } else {
            setErrors(validationErrors);
        }

    }
        
    const isReturned = ass.assignment_status === 'Returned';
    const isTurnedIn = ass.assignment_status === 'Turned In';
    const isPending = ass.assignment_status === 'Pending';
    const isNotTurnedIn = ass.assignment_status === 'Not Turned In';
    const isLate = new Date() > new Date(ass.due_date);
    const renderSubmitButton = () => (
        <button
          onClick={() => setConfirm(true)}
          type='button'
          className={`bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600 mt-2`}>
          {isLate ? "Late Turned In" : (isTurnedIn ? "Turned In again" : (isPending ? "Turned In" : (isNotTurnedIn ? "Late Turned In" : "")))}
        </button>
      );
    return (
        <>
            {confirm && <ConfirmModal onClose={() => setConfirm(false)} id='' onConfirm={handleSubmit} />}
            <div className='flex items-center justify-between border-b-2 border-gray-300 p-4'>
            
                <h1 className='text-2xl font-bold'>{classroom.name}'s Assignment</h1>
                      
             </div>
            
            <form action="">            
                <div className='h-full p-4 m-6 flex flex-col gap-6'>
                    <div className='flex flex-col gap-2 border border-gray-200 rounded-lg'>
                        <div className='flex justify-between'>
                            <div className='p-4 flex flex-col'>
                                <div className='flex items-center gap-6 mb-4'>
                                    <span className='text-sm font-light'>Due Date <span className='font-semibold'>{ass.due_date}</span></span>
                                    <h2 className='font-semibold text-blue-700'>{ass.points} 
                                        <span className='font-light text-black text-xs'> Points </span></h2>
                                </div>
                                <span className='text-xs italic text-gray-400'>Title: </span>
                                <h2 className='font-semibold'>{ass.name}</h2>
                            </div>
                            
                        </div>
                        
                        <div className='border-t border-gray-200 mx-6'>

                        </div>
                        <div className='p-4 flex flex-col'>
                            <span className='text-xs italic text-gray-400'>Instruction:</span>
                            <span className='font-medium text-sm'>{ass.instruction}</span>
                            
                        </div>
                    </div>
                   
                    <div className='border border-gray-200 p-4 rounded-lg flex flex-col'>
                    
                        {ass.attachment && (                       
                            <Accordion name='Attachment Preview'>
                                {ass.attachment.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                    <img 
                                        src={`${SERVER}/${ass.attachment}`} 
                                        alt={`Preview of ${ass.assignment_id}`} 
                                        style={{ width: '100%', maxWidth: '600px', height: 'auto' }} 
                                    />
                                ) : ass.attachment.match(/\.pdf$/i) ? (
                                    <iframe 
                                        src={`${SERVER}/${ass.attachment}`} 
                                        width="100%" 
                                        height="600px" 
                                        title="PDF Preview"
                                    />
                                ) : (
                                    <p>Preview not available for this file type.</p>
                                )}                        
                            </Accordion>
                        )}
                        {!ass.attachment && 
                            <>
                                <span className='text-xs italic text-gray-400'>Insert your answer here.</span>
                                <input                         
                                    type="file"                            
                                    onChange={handleChange}
                                    className="w-full rounded-lg p-4 text-sm"
                                />
                                {errors.attachment && <p className="text-red-500 text-sm">{errors.attachment}</p>}
                            </>
                        }
                        
                    </div>

                    <>
                        {!isReturned && (
                        <div className='flex gap-4'>
                            {isTurnedIn && !edit && (
                            <>
                                <button
                                onClick={() => setEdit(true)}
                                type='button'
                                className={`bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600 mt-2`}>
                                Edit
                                </button>                                
                            </>
                            )}
                            
                            {!isTurnedIn && (
                            <>
                                {renderSubmitButton()}
                            </>
                            )}
                            
                            {isTurnedIn && edit && (
                            <>
                                {renderSubmitButton()}
                                <button
                                onClick={() => setEdit(false)}
                                type='button'
                                className={`bg-gray-500 p-2 rounded-md w-[10rem] text-white hover:bg-gray-600 mt-2`}>
                                Cancel Edit
                                </button>
                            </>
                            )}
                        </div>
                        )}
                    </>
                </div>
            </form>
        
        </>
    )

}

