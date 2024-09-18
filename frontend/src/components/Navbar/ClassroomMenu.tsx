import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { MoreModal } from '../Modal/More'
import { Spinner } from '../Spinner/spinner'
import { ErrorAlert } from '../Alert/ErrorAlert'
import { SuccessAlert } from '../Alert/SuccessAlert'
import useModalStore from '../../process/Modal/useModalStore'
import { ClassroomTypes } from '../../process/Classroom/classroomTypes'

const active = 'h-[2rem] text-sm bg-gray-200 text-gray-500 text-left px-6'
const notActive = 'h-[2rem] text-sm hover:bg-gray-200 text-gray-500 text-left px-6'

type MainMenuProps = {
    children: React.ReactNode
}


export const ClassroomMenu:React.FC<MainMenuProps> = ({children}) => {
    
    const [classroom, setclassroom] = useState<ClassroomTypes>();    
    const length : number  = window.location.href.split("/").length
    const class_id = window.location.href.split("/")[length-2]
    
    const navigate = useNavigate()

    useEffect(() => {
        const storedClassroom = localStorage.getItem('selectedClassroom');
        if (storedClassroom) {
            setclassroom(JSON.parse(storedClassroom));
        }
    }, []);
        
    const getLinkID = () => {

        if (window.location.href.split("/").pop() === 'new' ){            
            return window.location.href.split("/")[length-2]
        } else if (window.location.href.split("/").pop() === 'view' ) {           
            return window.location.href.split("/")[length-3]   
        }
        return window.location.href.split("/").pop()
    }

    const {    
        isLoading,
        isErrorAlertVisible,        
        hideErrorAlert } = useModalStore()
   
    const [isActive, setActive] = useState(getLinkID)
    const navigateTo = (name : string) =>{        
        setActive(name)             
        navigate(`${class_id}/${name}`, {state:{classroom}})
    }
        
    return (
        <>
            {isErrorAlertVisible && <ErrorAlert isVisible={isErrorAlertVisible} onClose={hideErrorAlert} title={"Server Error"} 
            body={"An issue occurred. Please try again later. If the problem continues, please contact customer service. Thank you."}/>}
            
                <div className='flex h-full w-full'>
                                 
                    <div className='flex flex-col gap-4 
                    border-r border-gray-200 h-full z-0 w-[30%] bg-white'>
                        <div className='h-[15rem] bg-[green]'></div>

                        <div className='flex items-center justify-between mx-6 my-2 relative'>
                            <h1 className='text-xl font-bold'>{classroom?.name}</h1>

                            <MoreModal class_id={classroom?.class_id || ""}/>
                        </div>

                        <div className='flex flex-col '>
                            <button type='button' className={isActive === "posts" ? active : notActive} onClick={() => navigateTo("posts")}>
                                Posts
                            </button>
                            <button type='button' className={isActive === "assignments" ? active : notActive} onClick={() => navigateTo("assignments")}>
                                Assignments
                            </button>
                            <button type='button' className={isActive === "grades" ? active : notActive} onClick={() => navigateTo("grades")}>
                                Grade
                            </button>
                            <button type='button' className={isActive === "schedule" ? active : notActive} onClick={() => navigateTo("schedule")}>
                                Schedule Meeting
                            </button>
                            <button type='button' className={isActive === "members" ? active : notActive} onClick={() => navigateTo("members")}>
                                Members
                            </button>
                        </div>                                
                    </div>

                    <div className='w-[70%] bg-white'>
                        <Spinner isLoading={isLoading}>
                            {children}
                        </Spinner>
                    </div>
                </div>  
            
        </>       
    )
}
