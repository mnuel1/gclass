

export const AccountSettings: React.FC = () => {

    
    return(
        <>
            <div className='flex flex-col h-full'>

                <div className='bg-white grow'>
                    <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
                        <div>
                        <h1 className='text-2xl font-bold'>Account Settings</h1> 
                        <span className="text-xs text-gray-400">This displays every data you need to see.</span>
                        </div>                        
                    </div>


                    <div>
                        <h1>Account Information</h1>

                        <div className="flex">
                        <label
                            htmlFor="firstname"
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                            <span className="text-xs font-medium text-gray-700"> First Name </span>

                            <input
                                type="email"
                                id="firstname"
                                placeholder="anthony@rhcp.com"
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        <label
                            htmlFor="middlename"
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                            <span className="text-xs font-medium text-gray-700"> Middle Name </span>

                            <input
                                type="email"
                                id="middlename"
                                placeholder="anthony@rhcp.com"
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        <label
                            htmlFor="lastname"
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                            <span className="text-xs font-medium text-gray-700"> Last Name </span>

                            <input
                                type="email"
                                id="lastname"
                                placeholder="anthony@rhcp.com"
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>

                        </div>

                        <label
                            htmlFor="email"
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                            <span className="text-xs font-medium text-gray-700"> Email Address </span>

                            <input
                                type="email"
                                id="email"
                                placeholder="anthony@rhcp.com"
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        
                        <div className="border-t border-gray-300 flex flex-col">
                            <h1>
                                Change Password
                            </h1>
                        <label
                            htmlFor="password"
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                            <span className="text-xs font-medium text-gray-700"> Current Password </span>

                            <input
                                type="password"
                                id="password"
                                placeholder=""
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        <label
                            htmlFor="passwordconfirm"
                            className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                            <span className="text-xs font-medium text-gray-700"> Confirm Password </span>

                            <input
                                type="password"
                                id="passwordconfirm"
                                placeholder=""
                                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        </label>
                        </div>
                    </div>


                </div>
                                
            </div>
            
        </>
    )
}

