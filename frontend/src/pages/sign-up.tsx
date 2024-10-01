import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
    const navigate = useNavigate()
    
    const goTeacher = () => {
        navigate(`/teacher/signup`)
    }
    const goStudent = () => {
        navigate(`/student/signup`)
    }
    return (
        <>
            <section className="bg-gray-50 flex h-full relative bg-bg z-0">
                <div className="mx-auto max-w-screen-[calc(100vw-100px)] px-4 lg:flex grow lg:items-center">
                    <div className="mx-auto max-w-[calc(100vw-100px)] text-center">
                        <div className="relative w-[calc(100vw-100px)] mt-8 lg:mt-0 h-[calc(100vh-150px)] ">

                            <div className="flex flex-col items-center justify-center h-full">
                                <h1 className="text-2xl sm:text-5xl font-semibold mb-4">Join us as?</h1>
                                <div className="flex gap-10">
                                    {/* Teacher Icon */}
                                    <div
                                        onClick={() => goTeacher()} 
                                        className="flex flex-col items-center bg-blue-200 rounded-lg p-6 sm:p-12 cursor-pointer hover:bg-blue-300">
                                        <img src="https://img.icons8.com/?size=250&id=4pqQPkkb51n5&format=png&color=000000"                                         
                                        alt="" />
                                        <span className="font-medium text-sm mt-2">Teacher</span>
                                    </div>

                                    {/* Student Icon */}
                                    <div
                                        onClick={() => goStudent()}  
                                        className="flex flex-col items-center bg-blue-200 rounded-lg p-6 sm:p-12 cursor-pointer hover:bg-blue-300">
                                        <img src="https://img.icons8.com/?size=250&id=LMhH2eAC6LY8&format=png&color=000000" alt="" />
                                        <span className="font-medium text-sm mt-2">Student</span>
                                    </div>
                                </div>
                                <span className='text-md text-gray-500 font-bold mt-4'>Choose what user you are.</span>
                            </div>
                                                                           
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                .bg-bg {
                    background-color: rgba(229, 229, 247, 0.2); /* Semi-transparent background color */
                    background-size: 20px 20px;
                    background-image: repeating-linear-gradient(
                        0deg,
                        rgba(68, 76, 247, 0.2), /* Semi-transparent gradient */
                        rgba(68, 76, 247, 0.2) 1px,
                        rgba(229, 229, 247, 0.2) 1px,
                        rgba(229, 229, 247, 0.2)
                    );
                }
          
            `}</style>
                    
        </>
    );
};
