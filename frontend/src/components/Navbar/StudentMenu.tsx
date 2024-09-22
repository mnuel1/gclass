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

export const StudentMenu: React.FC<MainMenuProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isActive, setActive] = useState(window.location.href.split("/").pop());
  const { isLoading } = useModalStore();
  const navigate = useNavigate();
  const { logout, getUser, getID } = Authentication();

  useEffect(() => {
    if (getID() === null) {
      navigate("/student/login");
    }
  }, []);

  const user = getUser();
  const firstLetter = user ? user.charAt(0).toUpperCase() : '';

  const handleNavBtn = (id: string) => {
    setActive(id);
    navigate(id);
  };

  const handleLogout = () => {
    logout();
    SuccessToast("Log-out successfully");
    navigate('/student/login');
  };

  return (
    <>
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center bg-white w-full md:h-[4rem] 
            md:justify-between p-2 md:p-6 border-b border-gray-300 drop-shadow-lg z-50">
            <div className="flex gap-4">
                {/* Collapse Button */}
                <button
                className={`${window.location.href.split("/").pop() === "meeting" ? "hidden" : "block"} hidden lg:block `}
                onClick={() => setCollapsed(prev => !prev)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="size-12 text-black cursor-pointer hover:bg-gray-200 p-2 rounded-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                
                {/* Mobile Menu Button */}
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
                        onClick={() => handleNavBtn(`class`)}
                        className={
                            `${isActive === 'class' ? `bg-blue-100` : 
                                `hover:bg-gray-200` } 
                                block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700`
                        }>
                            Class
                        </a>
                        </li>
                        <li>
                        <a 
                        onClick={() => handleNavBtn(`calendar`)}
                        className={
                            `${isActive === 'calendar' ? `bg-blue-100` : 
                                `hover:bg-gray-200` } 
                                block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700`
                        }>
                            Calendar
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

                {/* User Info */}
                <div className="flex items-center gap-2 p-2">
                <div className="rounded-full w-[40px] flex justify-center p-2 bg-blue-200 font-bold">{firstLetter}</div>
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg text-black">{user}</h3>
                    <span className="text-xs text-gray-400">Student</span>
                </div>
                </div>
            </div>
            </div>

            {/* Sidebar and Main Content */}
            <div className="flex flex-col md:flex-row grow">
                {/* Sidebar */}
                <div className={`p-4 bg-white hidden lg:flex flex-col gap-6 justify-start 
                    border-r border-gray-300 transition-all duration-300`}>
                    <div
                        onClick={() => handleNavBtn(`class`)}
                        className={
                            `${isActive === 'class' ? active : notActive}
                            ${collapsed ? 'justify-center' : 'justify-start'}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="size-8 text-black rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>

                        <span className={`${collapsed ? 'hidden' : 'sm:block '} text-xs lg:text-lg font-semibold`}> Class </span>
                    </div>
                    <div
                        onClick={() => handleNavBtn("calendar")}
                        className={
                            `${isActive === 'calendar' ? active : notActive}
                            ${collapsed ? 'justify-center' : 'justify-start'}`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="size-8 text-black rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>

                        <span className={`${collapsed ? 'hidden' : 'sm:block '} text-xs lg:text-lg font-semibold`}> Calendar </span>
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
                {/* <NavLink 
                    to={"assignments"} 
                    className={({isActive}) => 
                    isActive ? active : notActive}
                >
                    <MdOutlineAssignment className='text-3xl'/>
                    <span className='text-xs sm:block md:text-md font-bold w-full truncate text-center'> Assignment </span>
                </NavLink> */}
                {/* <NavLink 
                    to={"activity"} 
                    className={({isActive}) => 
                    isActive ? active : notActive}
                >
                    <IoMdNotificationsOutline className='text-3xl'/>
                    <span className='text-xs sm:block md:text-md font-bold w-full truncate text-center'> Activity </span>
                </NavLink>
            </div>

            {/* Main Content Area */}
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
