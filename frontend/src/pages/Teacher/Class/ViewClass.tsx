import React from 'react'

import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { PostBlock } from '../../../components/PostbBock/PostBlock'
import { ContentHeader } from '../../../components/Header/ContentHeader'
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

                <div className='w-[30%] bg-white '>
                    <ClassroomMenu item={classData}/>
                </div>

                <div className='w-[70%] bg-gray-200'>
                    {/* <div className='flex items-center justify-between border-b-2 border-gray-300 p-4'>
                    
                        <h1 className='text-2xl font-bold'>{classData.name}'s Posts</h1>
                        <button 
                            type='button' 
                            className='p-2 bg-gray-600 rounded-md text-white flex 
                            items-center gap-2 hover:bg-gray-700'
                            onClick={handleScheduleMeeting}
                            > 
                            <CiVideoOn/> 
                            Meet Now
                        </button>
                    </div> */}
                    <ContentHeader name={`${classData.name}'s Posts`} icon={<CiVideoOn/>} buttonName='Meet Now'/>

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