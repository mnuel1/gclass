
import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'

import { Accordion } from '../../../components/Accordion/Accordion'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface item {
    id: string,
    name: string,
    description: string
}

const students = [
    {
        student_id: "1",
        first_name: "Juan 1",
        last_name: "Dela cruz",
        middle_name: "Santo",
        email_address: "",
        password: "",
        created_time: "09/20/2024"

    },
    {
        student_id: "2",
        first_name: "Juan 12",
        last_name: "Dela cruz",
        middle_name: "Santo",
        email_address: "",
        password: "",
        created_time: "09/21/2024"

    },
    {
        student_id: "3",
        first_name: "Juan 13",
        last_name: "Dela cruz",
        middle_name: "Santo",
        email_address: "",
        password: "",
        created_time: "09/22/2024"

    },
    {
        student_id: "4",
        first_name: "Juan 14",
        last_name: "Dela cruz",
        middle_name: "Santo",
        email_address: "",
        password: "",
        created_time: "09/20/2024"

    },
]

export const Members:React.FC = () => {
    // const [active, setActive] = useState("pending")
    const location = useLocation()
    const navigate = useNavigate()
    const classData : item = location.state.item
    const item : item = location.state.item

    // const handleFilter = (name : string) => {
    //     setActive(name)
    // }
       
    const getClassMembers = () => {
        console.log(location.state.id)
    }

    const handleAddMember = () => {
        navigate(`/teacher/class/${classData.id}/members/new`, {state:{item}})
    }

    const handleRemoveMember = () => {
        // navigate(`/teacher/class/${classData.id}/assignments/new`, {state:{item}})
    }

    return (
        <>

            <div className='flex h-full w-full'>

                <div className='w-[30%] bg-white '>
                    <ClassroomMenu item={classData}/>
                </div>

                <div className='flex flex-col w-[70%] bg-gray-200'>
                    <div className='flex items-center justify-between border-b-2 border-gray-300 p-4'>
                    
                        <h1 className='text-2xl font-bold'>{classData.name}'s Members</h1>
                        <div className='flex gap-2'>

                            <button 
                                type='button' 
                                className='p-2 bg-gray-600 rounded-md text-white flex 
                                items-center gap-2 hover:bg-gray-700'
                                onClick={handleAddMember}
                                > 
                                <FaPlus/> 
                                Add Member
                            </button>
                            <button 
                                type='button' 
                                className='p-2 bg-gray-600 rounded-md text-white flex 
                                items-center gap-2 hover:bg-gray-700'
                                onClick={handleRemoveMember}
                                > 
                                <FaMinus/> 
                                Remove Member
                            </button>

                        </div>
                        
                    </div>
                    

                    <div className='p-4 m-6 bg-white grow'>
                        {/* <div className='flex gap-4'>
                            <button onClick={() => handleFilter("pending")}className={active === 'pending' ? aactive : notActive}>Pending</button>
                            <button onClick={() => handleFilter("past")}className={active === 'past' ? aactive : notActive}>Past Due</button>
                            <button onClick={() => handleFilter("complete")}className={active === 'complete' ? aactive : notActive}>Completed</button>
                        </div> */}

                        <div className='flex flex-col gap-4 p-2'>
                            <div className='flex border-b-2 border-gray-300'>
                                <span className='text-[11px] text-gray-400'>Teacher</span>                            
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <div className='rounded-full w-[40px] flex justify-center p-2 bg-[green] font-bold flex-none self-start'> T </div>
                                    <span className='font-semibold'>Teacher Name</span>
                                </div>

                                <div>
                                    
                                </div>
                            </div>
                            
                            
                            
                        </div>
                                                                            
                        <div className='border-b-2 border-gray-300 my-2'/>                            
                        <Accordion name='Students'>
                            {students.map((student, index) => (
                                <>       
                                                        
                                    <div key={index} className='flex items-center justify-between my-2 p-2'>
                                        <div className='flex gap-2 items-center '>
                                            <div className='rounded-full w-[40px] flex justify-center p-2 bg-[green] font-bold flex-none self-start'> T </div>
                                            <span className='font-semibold'>{student.last_name}, {student.first_name} {student.middle_name}</span>
                                        </div>

                                        <span className='text-xs text-gray-400'>{student.created_time}</span>
                                    </div>                                                                
                                </>                      
                            ))}
                        </Accordion>
                    </div>

                </div>                
            </div>                
        </>
    )

}

