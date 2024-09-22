import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreModal } from '../Modal/More'
import { ClassroomTypes } from '../../process/Classroom/classroomTypes'
import useClassroomStore from '../../pages/Student/process/Classroom/useClassroomStore'

const blockView = "md:w-[15rem] md:h-[15rem] border border-gray-300 "
const listView = "w-full h-[5rem] border border-gray-300"

export const Classroom:React.FC<{ classroom : ClassroomTypes}> = ({classroom}) => {
    
    const navigate = useNavigate()    
    const { selectClassroom } = useClassroomStore();
    
    const navigateToClassroom = (classroom: ClassroomTypes) => {
        selectClassroom(classroom)                
        navigate(`${classroom.class_id}/posts`, {state:{classroom}})
    }
    
    return (
        <>
            <div className={`flex flex-col ${listView} ${blockView} `}>
                <div className='h-[70%] bg-[green] cursor-pointer' onClick={() => navigateToClassroom(classroom)}>
                    {/* JUST A BG */}
                </div>
                <div className='bg-white h-[30%]  flex items-center'>
                    <div className='flex justify-between mx-2 my-2 relative grow'>
                        <h1 className='mx-2 cursor-pointer text-xl'onClick={() => navigateToClassroom(classroom)}> {classroom.name} </h1>
                        {/* <MoreModal class_id={classroom.class_id}/>                    */}
                    </div>

                                        
                </div>
            </div>
        
        </>

    )
}

