import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import { useAddMeeting } from '../../../process/Calendar/useCalendarQuery';
import { ClassroomTypes } from '../../../process/Classroom/classroomTypes'
import { FailedToast } from '../../../components/Toast/FailedToast';


interface FormState {
    title: string;
    description?: string;
    time: string;
    date: string;    
    class_id: string;
    start_date:string;
}
interface ErrorsState {
    title?: string,        
    description?: string,
    time?: string;
    date?: string;
  
}


export const CreateSchedule:React.FC = () => {
   
    
    const [errors, setErrors] = useState<ErrorsState>({});
    const location = useLocation()
    const classroom : ClassroomTypes = location.state.classroom

 
    const [form, setForm] = useState<FormState>({
        title: "",
        description: "",
        time: "",
        date: "",
        start_date: "",
        class_id: classroom.class_id
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (form.title.length <= 0) {
            newErrors.title = "Title is required.";
        }

        if (form.time.length <= 0) {
            newErrors.time = "Time is required.";
        }

        if (form.date.length <= 0) {
            newErrors.date = "Date is required";
        }
        
        return newErrors;
    };

    const createTimestamp = () => {
        
        const formattedDate = form.date.replace(/\//g, '-'); 
        const dateTimeString = `${formattedDate}T${form.time}`; 
        const date = new Date(dateTimeString); 
            
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const addMeetingMutation = useAddMeeting()
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
                        
        if (Object.keys(validationErrors).length === 0) {
            form.start_date = createTimestamp()
            addMeetingMutation.mutate(form)
            window.location.reload()

        } else {
            setErrors(validationErrors);
        }

    }

    return (
        <>

            <div className='border-b-2 border-gray-300 p-6 flex justify-between items-center '>
                <h1 className='text-2xl font-bold'>Schedule a Meeting</h1>                        
            </div>

            <form action="" onSubmit={handleSubmit}>
                <div className='p-4 m-6 flex flex-col gap-2'>
                
                    <div className='flex flex-col gap-2'>
                        <span className='text-sm text-gray-500'>Title <span className='text-red-700'>*</span> </span>
                        <div>                                
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter title"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}                                                    
                        </div>
                        
                    </div>
                                                          
                    <div className='flex flex-col gap-2'>
                        <span className='text-sm text-gray-500'>When <span className='text-red-700'>*</span> </span>
                        <div className='flex max-w-md gap-2'>
                            <div>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"                                
                            />
                                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                            </div>
                            <div>
                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />
                                {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                            </div>
                        </div>
                                                
                        
                        
                    </div>
                    <button 
                        type='submit'                    
                        className='bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600'> 
                        Schedule 
                    </button>                    
                </div>
            </form>
            
        </>
    )

}

