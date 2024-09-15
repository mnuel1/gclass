import React from 'react'

import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { PostBlock } from '../../../components/PostbBock/PostBlock'

import { CiVideoOn } from 'react-icons/ci'
interface item {
    id: string,
    name: string,
    description: string
}


export const ClassroomView:React.FC = () => {
    const location = useLocation()
    const classData : item = location.state.item
    
    const getClassroom = () => {
        console.log(location.state.id)
    }
    const handleScheduleMeeting = () => {
        // navigate(`/teacher/class/${classData.id}/assignments/new`, {state:{item}})
        // alert('yes')
    }
    return (
        <>

            <div className='flex h-full w-full'>

                <div className='w-[30%] bg-white h-full'>
                    <ClassroomMenu item={classData}/>
                </div>

                <div className='w-[70%] bg-white'>
                    <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
                    
                        <h1 className='text-2xl font-bold'>{classData.name}'s Posts</h1>
                        <button 
                            type='button' 
                            className='p-2 rounded-md text-black flex 
                            items-center gap-2 hover:bg-blue-200 border border-gray-300'
                            onClick={handleScheduleMeeting}
                            > 
                            <CiVideoOn/> 
                            Meet Now
                        </button>
                    </div>
                    

                    <div className='p-4 m-6'>

                        <div className='flex items-center justify-center border-b-2 border-gray-300'>
                            <span className='text-[11px] text-gray-400'>Jan 20, 2002</span>
                        </div>
                        <PostBlock/>
                        
                    </div>

                </div>

                


            </div>


        
        
        </>
    )


}