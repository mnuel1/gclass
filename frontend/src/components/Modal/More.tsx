import React, { useState } from 'react'
import { IoMdMore } from 'react-icons/io'



export const MoreModal:React.FC = () => {

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
            
            <IoMdMore className='text-3xl cursor-pointer z-50 hover:bg-gray-200 rounded-full' onClick={handleMoreModal}/>
            {
                moreModal &&
                <div className='w-[8rem] h-fit absolute right-2 top-[2rem] flex flex-col bg-white rounded-md p-2 shadow-lg border border-gray-200'>
                    <button 
                        type='button' 
                        className="h-[2rem] text-sm hover:bg-gray-200 text-gray-500 text-left px-2 text-sm text-black hover:bg-gray-200" 
                        onClick={() => editModal()}>
                        Edit Class
                    </button>
                    <button 
                        type='button' 
                        className="h-[2rem] text-sm hover:bg-gray-200 text-gray-500 text-left px-2 text-sm text-black hover:bg-gray-200" 
                        onClick={() => deleteModal()}>
                        Delete Class
                    </button>                         
                </div>
            }       
        </>
    )
}