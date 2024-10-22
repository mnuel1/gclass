import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../../Auth/Authentication';
import { SuccessToast } from '../Toast/SuccessToast';
import { Spinner } from '../Spinner/spinner';
import useModalStore from '../../process/Modal/useModalStore';

type MainMenuProps = {
  children: React.ReactNode;
};

const active = "text-black bg-blue-100 rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer";
const notActive = "text-black hover:bg-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 w-full cursor-pointer";

export const AdminMenu: React.FC<MainMenuProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isActive, setActive] = useState(window.location.href.split("/").pop());
  const { isLoading } = useModalStore();
  const navigate = useNavigate();
  const { logout, getID } = Authentication();

  useEffect(() => {
    if (getID() === null) {
      navigate("/");
    }
  }, []);

  

  const handleNavBtn = (id: string) => {
    setActive(id);
    navigate(id);
  };

  const handleLogout = () => {
    logout();
    SuccessToast("Log-out successfully");
    navigate('/admin/login');
  };

  return (
    <>
        <div className="flex flex-col min-h-screen">

            <div className="flex flex-col md:flex-row md:items-center bg-white w-full md:h-[4rem] 
            md:justify-between p-2 md:p-6 border-b border-gray-300 drop-shadow-lg z-50">
                <div className="flex gap-4">
                    
                    <button
                    className={`${window.location.href.split("/").pop() === "meeting" ? "hidden" : "block"} hidden lg:block `}
                    onClick={() => setCollapsed(prev => !prev)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="size-12 text-black cursor-pointer hover:bg-gray-200 p-2 rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    
                    
                    <button onClick={() => setCollapsed(prev => !prev)} className="relative block lg:hidden z-50 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="size-12 text-black cursor-pointer hover:bg-gray-200 p-2 rounded-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    {collapsed && (
                        <div className="absolute bg-white w-[15rem] left-0 z-50 shadow-lg">
                            <ul className="space-y-1 p-2">
                                <li>
                                    <a 
                                    onClick={() => handleNavBtn(`teachers`)}
                                    className={
                                        `${isActive === 'teachers' ? `bg-blue-100` : 
                                            `hover:bg-gray-200` } 
                                            block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700`
                                    }>
                                        Teachers
                                    </a>
                                </li>                            
                                <li>
                                    <a 
                                    onClick={() => handleNavBtn(`account`)}
                                    className={
                                        `${isActive === 'account' ? `bg-blue-100` : 
                                            `hover:bg-gray-200` } 
                                            block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700`
                                    }>
                                        Account
                                    </a>
                                </li>
                                <div className="border-t border-gray-300" />
                                <li>
                                    <a 
                                    onClick={() => handleLogout()}
                                    className={
                                        `hover:bg-gray-200 block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700`
                                    }>
                                        Log-out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                    </button>

                </div>
            </div>

            <div className="flex flex-col md:flex-row grow">

                <div className={`p-4 bg-white hidden lg:flex flex-col gap-6 justify-start 
                    border-r border-gray-300 transition-all duration-300`}>
                    <div
                        onClick={() => handleNavBtn(`teachers`)}
                        className={
                            `${isActive === 'teachers' ? active : notActive}
                            ${collapsed ? 'justify-center' : 'justify-start'}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="size-8 text-black rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>

                        <span className={`${collapsed ? 'hidden' : 'sm:block '} text-xs lg:text-lg font-semibold`}> Teachers </span>
                    </div>
                    <div
                        onClick={() => handleNavBtn("account")}
                        className={
                            `${isActive === 'account' ? active : notActive}
                            ${collapsed ? 'justify-center' : 'justify-start'}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="size-8 text-black rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5
                            0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                        <span className={`${collapsed ? 'hidden' : 'sm:block '} text-xs lg:text-lg font-semibold`}> Account </span>
                    </div>

                    
                    <div className='border-t border-gray-300'/>
                    
                    <div
                        onClick={() => handleLogout()}
                        className={`text-black hover:bg-gray-200 rounded-lg p-2 flex items-center gap-2 overflow-hidden w-full cursor-pointer 
                            ${collapsed ? 'justify-center' : 'justify-start'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-black cursor-pointer rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>


                        <span className={`${collapsed ? 'hidden' : 'sm:block '} text-xs lg:text-lg font-semibold`}> Log-out </span>
                    </div>
                </div>                
            
                <div className="bg-gray-200 w-full overflow-auto">
                    <Spinner isLoading={isLoading}>
                    {children}
                    </Spinner>
                </div>
            </div>
        </div>
    </>
  );
};
