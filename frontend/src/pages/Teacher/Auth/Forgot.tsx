import React, { useState } from "react"
import { authapi } from "../../../process/axios"
import { SuccessToast } from "../../../components/Toast/SuccessToast";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { Spinner } from "../../../components/Spinner/spinner";
import useModalStore from "../../../process/Modal/useModalStore";


interface FormState {  
    email_address: string;
}
interface ErrorsState {
    email_address?: string,        
}


export const TeacherForgot:React.FC = () => {
  
    
    const [form, setForm] = useState<FormState>({
        email_address: '',  
    });

    const [errors, setErrors] = useState<ErrorsState>({});    
    const {
        isLoading,        
        startLoading,
        stopLoading } = useModalStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (form.email_address.length <= 0) {
            newErrors.email_address = "Email Address is required.";
        }       
        return newErrors;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validationErrors = validate();
                
        if (Object.keys(validationErrors).length === 0) {
                        
            startLoading()
            try {
                const response = await authapi.post('/teacher/forgot', form)
                
                if (response.status === 200) {
                    SuccessToast("Request sent. Please check your email.")
                }
                   
                stopLoading()                                
            } catch (error : any) {
                if (error.code) {
                    FailedToast("Wrong username and password!")
                } else {
                    FailedToast("Something went wrong!")
                }
                
                stopLoading()
              
            }                         

        } else {
            setErrors(validationErrors);
        }
    }

    return (
        <>  
                                    
            <Spinner isLoading={isLoading}>        
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        {/* <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">Welcome to the Student Portal</h1>

                        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                            Please log in to access your learning materials and track your progress. If you encounter any issues, feel free to contact support.
                        </p> */}

                        <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handleSubmit}>
                        <p className="text-center text-lg font-medium">Forgot Password</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email_address"
                                    value={form.email_address}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                    </svg>
                                </span>                            
                            </div>
                            {errors.email_address && <p className="text-red-500 text-sm">{errors.email_address}</p>}
                        </div>                       
                        <button
                            type="submit"                        
                            className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-medium text-white"
                        >
                            Submit
                        </button>
                        
                        </form>
                    </div>
                </div>
            </Spinner>
            
        </>
    )
}