


export const TeacherSignup:React.FC = () => {

    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">Join the Teacher Portal</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Sign up to access teaching resources, manage your classes, and connect with your students. Complete the form below to get started.
                    </p>



                    <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-">
                        <p className="text-center text-lg font-medium">Sign up an account</p>


                        <div className="flex flex-col md:flex-row gap-6 p-2 border-b border-gray-200">
                            <div>
                                <label htmlFor="first_name" className="sr-only">First Name</label>

                                <div className="relative">
                                <input
                                    type="first_name"
                                    className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter first name"
                                />                                
                                </div>
                            </div>
                            <div>
                                <label htmlFor="middle_name" className="sr-only">Middle Name</label>

                                <div className="relative">
                                <input
                                    type="middle_name"
                                    className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter middle name"
                                />
                               
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last_name" className="sr-only">Last Name</label>

                                <div className="relative">
                                <input
                                    type="last_name"
                                    className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter last name"
                                />                              
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                            <input
                                type="email"
                                className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
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
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                            <input
                                type="password"
                                className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
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
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?
                            <a className="underline text-blue-500 ml-2" href="/teacher/login">Log-in </a>
                        </p>
                    </form>
                </div>
            </div>
        
        </>
    )
}