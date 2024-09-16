import React, { useState } from 'react'

import { ClassroomTypes } from '../../types/classroomTypes'
import { useNavigate } from 'react-router-dom'
import { MoreModal } from '../Modal/More'

const active = 'h-[2rem] text-sm bg-gray-200 text-gray-500 text-left px-6'
const notActive = 'h-[2rem] text-sm hover:bg-gray-200 text-gray-500 text-left px-6'


export const ClassroomMenu:React.FC<{item: ClassroomTypes}> = ({item}) => {

    const navigate = useNavigate()
    
    const getLinkID = () => {

        if (window.location.href.split("/").pop() === 'new' ){
            const length : number  = window.location.href.split("/").length                        
            return window.location.href.split("/")[length-2]            
        } else if (window.location.href.split("/").pop() === 'view' ) {
            const length : number  = window.location.href.split("/").length
            return window.location.href.split("/")[length-3]   
        }
        return window.location.href.split("/").pop()
    }
   
    const [isActive, setActive] = useState(getLinkID)
    const navigateTo = (id : string) =>{        
        setActive(id)
        navigate(`/teacher/class/${item.teacher_id}/${id}`, {state:{item}})
        
    }
    
    

    return (
        <>                        
            <div className='flex flex-col gap-4 
            border-r border-gray-200 h-full z-0'>
                <div className='h-[15rem] bg-[green]'></div>

                <div className='flex items-center justify-between mx-6 my-2 relative'>
                    <h1 className='text-xl font-bold'>{item.name}</h1>
                    <MoreModal id={item.class_id}/>                   
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
        
        </>       
    )
}
