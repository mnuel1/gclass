import React, { useState } from "react"
import { useSearchParams } from "react-router-dom";
import { authapi } from "../../../process/axios"
import { SuccessToast } from "../../../components/Toast/SuccessToast";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { Spinner } from "../../../components/Spinner/spinner";
import useModalStore from "../../../process/Modal/useModalStore";


interface FormState {  
    password: string;
}
interface ErrorsState {
    password?: string,        
}


export const TeacherReset:React.FC = () => {
      
    const [form, setForm] = useState<FormState>({
        password: '',  
    });

    const [searchParams] = useSearchParams()

    const email = searchParams.get('email');

    const [errors, setErrors] = useState<ErrorsState>({});    
    const [show, setShow] = useState(false)
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
        
        if (form.password.length <= 0) {
            newErrors.password = "password is required.";
        }       
        return newErrors;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validationErrors = validate();
        
        

        if (Object.keys(validationErrors).length === 0) {
                        
            startLoading()
            try {
                console.log(form);
                console.log(email);

                const data = {
                    password: form.password,
                    email: email
                }
                
                const response = await authapi.post('/student/reset', data)
                
                if (response.status === 200) {
                    SuccessToast("Password changed successfully.")
                }

                form.password = ""
                   
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
                        <p className="text-center text-lg font-medium">Enter new password</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                            <input
                                type={show ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />

                            <span 
                                onClick={() => setShow(prev => !prev)}
                                className="cursor-pointer absolute inset-y-0 end-0 grid place-content-center px-4">
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                                </svg>
                            </span>                            
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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