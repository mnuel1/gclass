import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MoreModal } from '../Modal/More'

interface dataprops {
    id: string,
    name: string,
    description: string
}

const blockView = "md:w-[15rem] md:h-[15rem] border border-gray-300 "
const listView = "w-full h-[5rem] border border-gray-300"

export const Classroom:React.FC<{ dataprops : dataprops}> = ({dataprops}) => {

    const navigate = useNavigate()    

    const navigateToClassroom = (item: dataprops) => {
        
        navigate(`/teacher/class/${item.id}/posts`, {state:{item}})
    }

    return (

        <>

            <div className={`flex flex-col ${listView} ${blockView} `}>
                <div className='h-[70%] bg-[green] cursor-pointer' onClick={() => navigateToClassroom(dataprops)}>
                    {/* JUST A BG */}
                </div>
                <div className='bg-white h-[30%]  flex items-center'>
                    <div className='flex justify-between mx-2 my-2 relative grow'>
                        <h1 className='mx-2 cursor-pointer text-xl'onClick={() => navigateToClassroom(dataprops)}> {dataprops.name} </h1>
                        <MoreModal id={dataprops.id}/>                   
                    </div>

                                        
                </div>
            </div>
        
        </>

    )
}

