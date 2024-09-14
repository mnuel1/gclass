import React, { useState } from 'react'


export const UserMore:React.FC = () => {

    const [moreModal, openMoreModal] = useState(false)  

    const handleMoreModal = () => {
        openMoreModal(prev => !prev)
    }
    const editModal = () => {
        openMoreModal(prev => !prev)
    }

    const deleteModal = () =>{
        openMoreModal(prev => !prev)
    }

    return (
        <>
            <div className='flex items-center gap-2 my-4 cursor-pointer' onClick={handleMoreModal}>
                <div className='rounded-full w-[40px] flex justify-center p-2 bg-gray-200 font-bold'> U </div>
                <div className='flex flex-col'>
                    <h3 className='font-bold text-lg text-white'>Username</h3>
                    <span className='text-xs text-gray-400'>Role</span>
                </div>
                    
            </div>

            {
                moreModal && 
                <div className='w-[15rem] h-[7rem] absolute left-0 top-[4rem] flex flex-col bg-gray-900 rounded-md px-2 py-4'>
                    <button 
                        type='button' 
                        className="h-[2rem] text-sm hover:bg-gray-200 text-gray-500 text-left px-6 text-sm text-white hover:bg-white hover:text-black" 
                        onClick={() => editModal()}>
                        Account Information
                    </button>
                    <button 
                        type='button' 
                        className="h-[2rem] text-sm hover:bg-gray-200 text-gray-500 text-left px-6 text-sm text-white hover:bg-white hover:text-black" 
                        onClick={() => deleteModal()}>
                        Log-out
                    </button>                         
                </div>
            }
               
        </>
    )
}