import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { ClassroomTypes } from '../../../types/classroomTypes'
import { Textfield } from '../../../components/Fields/textfield'
import { Textarea } from '../../../components/Fields/textarea'
import { Attachment } from '../../../components/Fields/attachment'
import { DateField } from '../../../components/Fields/date'
import { NumberField } from '../../../components/Fields/numberfield'




export const CreateAssignment:React.FC = () => {
    
    const location = useLocation()
        
    const classData : ClassroomTypes = location.state.item
    
    return (
        <>

            <div className='flex h-full w-full'>
                <div className='w-[30%] bg-white '>
                    <ClassroomMenu item={classData}/>
                </div>
                <div className='w-[70%] bg-white'>
                    <div className='border-b-2 border-gray-300 p-6 flex justify-between items-center '>
                        <h1 className='text-2xl font-bold'>New Assignment</h1>

                        
                    </div>

                    <div className='h-full p-4 m-6 flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-sm text-gray-500'>Title <span className='text-red-700'>*</span> </span>
                            <Textfield />
                        </div>

                        
                        <Textarea name="Instructions"/>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xs italic text-gray-400'>Add files if neccessary</span>
                            <Attachment/>
                        </div>
                        
                        <div className='flex flex-col md:flex-row items-center gap-4'>

                            <div className='flex flex-col gap-2'>
                                <span className='text-sm text-gray-500'>Points <span className='text-red-700'>*</span> </span>
                                <NumberField />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='text-sm text-gray-500'>Due Date <span className='text-red-700'>*</span> </span>
                                <DateField /> 
                            </div>
                            
                        

                        </div>
                                                                        
                        <button 
                            type='button' 
                            className='bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600 mt-2'> 
                            Save </button>
                    </div>

                </div>

                


            </div>


        
        
        </>
    )

}

