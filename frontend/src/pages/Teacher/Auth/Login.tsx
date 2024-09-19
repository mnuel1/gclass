import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../../Auth/Authentication";
import { authapi } from "../../../process/axios"
import { SuccessToast } from "../../../components/Toast/SuccessToast";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { Spinner } from "../../../components/Spinner/spinner";
import useModalStore from "../../../process/Modal/useModalStore";


interface FormState {  
    email_address: string;
    password: string; 
}
interface ErrorsState {
    email_address?: string,        
    password?: string,   
}


export const TeacherLogin:React.FC = () => {
    const { login } = Authentication()
    const navigate = useNavigate()
    
    const [form, setForm] = useState<FormState>({
        email_address: '',
        password: '',      
    });

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
        
        if (form.email_address.length <= 0) {
            newErrors.email_address = "Email Address is required.";
        }

        if (form.password.length <= 0) {
            newErrors.password = "Password is required.";
        }
       
        return newErrors;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validationErrors = validate();

        if (Object.keys(validationErrors).length === 0) {
            startLoading()
            const response = await authapi.post('/teacher/login', form)
            
            if (response.status === 401) {

                FailedToast(response.data.message)
            }
            if (response.status !== 200) {
                FailedToast("Login Failed")
                return;
            }

            const user = `${response.data.last_name}, ${response.data.first_name}, ${response.data.middle_name}`
            const token = response.data.token
            const id = response.data.teacher_id
            const email = response.data.email_address
                        
            login( user, token, id, email )     
            SuccessToast("Login Success")       
            stopLoading()
            
            navigate(`/teacher/${response.data.teacher_id}/class`)           

        } else {
            setErrors(validationErrors);
        }
    }

    return (
        <>  
                                    
            <Spinner isLoading={isLoading}>        
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">Welcome to the Teacher Portal</h1>

                        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                            Please log in to access your teaching resources and manage your classes. If you encounter any issues, feel free to contact support.
                        </p>


                        <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handleSubmit}>
                        <p className="text-center text-lg font-medium">Sign in to your account</p>

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

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

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
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account yet?
                            <a className="underline text-blue-500 ml-2" href="/teacher/signup">Sign up </a>
                        </p>
                        </form>
                    </div>
                </div>
            </Spinner>
            
        </>
    )
}