import React from 'react'

import { NavLink } from 'react-router-dom'

export const Navbar:React.FC = () => {
    // const {showMenu, setShowMenu} = setShowMenuToggle();
  return (
    <div className='w-full z-[20] flex justify-between items-center bg-primary py-5 lg:py-0 px-[2rem] md:px-[5rem] font-secondary'>
        <div>
            <h1 className='text-white'>RESIBO PILIPINAS</h1>
        </div>
        {/* <div className='hidden lg:flex items-center gap-3'>
            
            <NavLink 
                to="buyer-login"
                className={({isActive}) => 
                isActive ? 'text-blue-500 p-5 border-b-2 border-blue-500' :
                'text-white hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 p-5'}
            >
                    Buyer Login
            </NavLink>
        </div> */}
        <div className='hidden lg:flex items-center gap-5'>
            <NavLink 
                to={"login"} 
                className={({isActive}) => 
                isActive ? 'text-blue-500 border-b-2 border-blue-500 p-5' :
                'text-white hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 p-5'}
            >
                Seller Login
            </NavLink>
            <NavLink 
                to={"temp-transaction"} 
                className={({isActive}) => 
                isActive ? 'text-blue-500 border-b-2 border-blue-500 p-5' :
                'text-white hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 p-5'}
            >
                Transaction
            </NavLink>
            {/* <NavLink 
                to="buyer-login"
                className={({isActive}) => 
                isActive ? 'text-blue-500 border-b-2 border-blue-500 p-5' :
                'text-white hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 p-5'}
            >
                Sign In
            </NavLink>
            <NavLink 
                to="/buyer-sign-up"
                className={({isActive}) => 
                isActive ? 'text-blue-500 border-b-2 border-blue-500 p-5' :
                'text-white hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 p-5'}
            >
                Sign Up
            </NavLink>            */}
        </div>
        {/* <div className='block lg:hidden z-[50]'>

        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className={`w-6 h-6 ${showMenu ? "text-white" : "text-secondary"} cursor-pointer hover:text-white transition-all
            delay-50 ease-in-out`}
            onClick={setShowMenu}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
            />
        </svg>

        </div> */}
        {/* <div className={`${showMenu ? "w-[19rem]" : "w-0"} h-screen lg:hidden z-[30] fixed shadow-xl shadow-gray-400 bg-white left-0 top-0
        overflow-hidden transition-all delay-50 ease-in-out flex flex-col justify-between py-10`}>
            <div className=''>
                <div className='row-span-1'>
                    <h1 className='text-center'>RESIBO PILIPINAS</h1>
                </div>
                <div className='flex flex-col gap-3 mt-10 p-2'>
                <NavLink 
                    to="login"
                    onClick={setShowMenu}
                    className={({isActive}) => 
                    isActive ? 'text-white rounded-xl bg-primary p-5 flex items-center gap-3' :
                    'text-primary hover:text-secondary hover:border-secondary rounded-xl hover:bg-onMouse p-5 flex items-center gap-3'}
                >
                    <AiFillHome className='text-xl'/>
                    Seller Login
                </NavLink>  
                <NavLink 
                    to="temp-transaction" 
                    onClick={setShowMenu}
                    className={({isActive}) => 
                    isActive ? 'text-white rounded-xl bg-primary p-5 flex items-center gap-3' :
                    'text-primary hover:text-secondary hover:border-secondary rounded-xl hover:bg-onMouse p-5 flex items-center gap-3'}
                >
                    <AiFillHome className='text-xl'/>
                    Transaction
                </NavLink>  
                <NavLink 
                    to="buyer-login"
                    className={({isActive}) => 
                    isActive ? 'text-white rounded-xl bg-primary p-5 flex items-center gap-3' :
                    'text-primary hover:text-secondary hover:border-secondary rounded-xl hover:bg-onMouse p-5 flex items-center gap-3'}
                >
                    <HiUserAdd className='text-xl'/>
                    Sign In
                </NavLink>
                <NavLink 
                    to="/buyer-sign-up"
                    className={({isActive}) => 
                    isActive ? 'text-white rounded-xl bg-primary p-5 flex items-center gap-3' :
                    'text-primary hover:text-secondary hover:border-secondary rounded-xl hover:bg-onMouse p-5 flex items-center gap-3'}
                >
                    <HiUserAdd className='text-xl'/>
                    Sign Up
                </NavLink>
                </div>
            </div>

            <div className='row-span-2 flex flex-col items-center gap-5'>
                <p className='font-primary'>@resibo pilipinas</p>
            </div>
        </div> */}
        
    </div>
  )
}
