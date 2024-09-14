import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'

import { Textfield } from '../../../components/Fields/textfield'
import { Textarea } from '../../../components/Fields/textarea'
import { Attachment } from '../../../components/Fields/attachment'
import { DateField } from '../../../components/Fields/date'

interface item {
    id: string,
    name: string,
    description: string
}



export const CreateSchedule:React.FC = () => {
    
    const location = useLocation()
        
    const classData : item = location.state.item
    
    return (
        <>

            <div className='flex h-full w-full'>
                <div className='w-[30%] bg-white '>
                    <ClassroomMenu item={classData}/>
                </div>
                <div className='w-[70%] bg-gray-200'>
                    <div className='border-b-2 border-gray-300 p-6 flex justify-between items-center '>
                        <h1 className='text-2xl font-bold'>Schedule a Meeting</h1>                        
                    </div>

                    <div className='h-full p-4 m-6 flex flex-col gap-2'>
                        <Textfield name="Name"/>
                        <Textarea name="Description"/>                       
                        <DateField name='When'/>
                        <button 
                            type='button' 
                            className='bg-gray-600 p-2 rounded-md w-[10rem] text-white hover:bg-gray-700'> 
                            Schedule 
                        </button>                    
                    </div>

                </div>

                


            </div>


        
        
        </>
    )

}

