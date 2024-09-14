import React, {useState} from 'react'


import { useNavigate } from 'react-router-dom'
import { Authentication } from '../../Auth/Authentication'


type MainMenuProps = {
    children: React.ReactNode
}

export const StudentMenu:React.FC<MainMenuProps> = ({children}) => {

    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const { logout } = Authentication()
    // const user = getUser();
    // const firstLetter = user ? user.charAt(0).toUpperCase() : '';
    return (
       <>

            <div className=''>

            </div>
            <div className='p-4 bg-[#F6FAFC]]'>
                <h1 className='text-xl text-center text-primary font-bold'>RESIBO PILIPINAS</h1>
            </div>
            {children}
        </>          
    )
}
