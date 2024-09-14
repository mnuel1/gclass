
import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'

import { AssignmentBlock } from '../../../components/AssignmentBlock/AssignmentBlock'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface item {
    id: string,
    name: string,
    description: string
}


const assignments = [
    {
        assignmentId: "",
        classId: "",
        studentIds: "",
        formId: "",
        formAnswers: "",
        assignmentStatus: "",
        passDate: "",                
        grade: "",
        attachments: "",                
        name: "Assignment 1",
        instructions : "",
        attachment: "",
        points: "",
        startDate: "09/12/2024",
        dueDate: "",

    },
    {
        assignmentId: "",
        classId: "",
        studentIds: "",
        formId: "",
        formAnswers: "",
        assignmentStatus: "",
        passDate: "",                
        grade: "",
        attachments: "",                
        name: "Assignment 2",
        instructions : "",
        attachment: "",
        points: "",
        startDate: "09/15/2024",
        dueDate: "",

    },
    {
        assignmentId: "",
        classId: "",
        studentIds: "",
        formId: "",
        formAnswers: "",
        assignmentStatus: "",
        passDate: "",                
        grade: "",
        attachments: "",                
        name: "Assignment 3",
        instructions : "",
        attachment: "",
        points: "",
        startDate: "09/13/2024",
        dueDate: "",

    }
]


// const aactive = "rounded-md bg-gray-800 hover:bg-gray-700 p-2 text-white"
// const notActive = "rounded-md bg-gray-600 hover:bg-gray-700 p-2 text-white"

export const Assignments:React.FC = () => {
    // const [active, setActive] = useState("pending")
    const location = useLocation()
    const navigate = useNavigate()
    const classData : item = location.state.item
    const item : item = location.state.item

    // const handleFilter = (name : string) => {
    //     setActive(name)
    // }
       
    const getClassroomAssignment = () => {
        console.log(location.state.id)
    }

    const handleCreateAssignment = () => {
        navigate(`/teacher/class/${classData.id}/assignments/new`, {state:{item}})
    }

    const handleAssignmentbutton = (data : any) => {

    }
    return (
        <>

            <div className='flex h-full w-full'>

                <div className='w-[30%] bg-white '>
                    <ClassroomMenu item={classData}/>
                </div>

                <div className='w-[70%] bg-gray-200'>
                    <div className='flex items-center justify-between border-b-2 border-gray-300 p-4'>
                    
                        <h1 className='text-2xl font-bold'>{classData.name}'s Assignment</h1>
                        <button 
                            type='button' 
                            className='p-2 bg-gray-600 rounded-md text-white flex 
                            items-center gap-2 hover:bg-gray-700'
                            onClick={handleCreateAssignment}
                            > 
                            <FaPlus/> 
                            New Assignment
                        </button>
                    </div>
                    

                    <div className='p-4 m-6'>
                        {/* <div className='flex gap-4'>
                            <button onClick={() => handleFilter("pending")}className={active === 'pending' ? aactive : notActive}>Pending</button>
                            <button onClick={() => handleFilter("past")}className={active === 'past' ? aactive : notActive}>Past Due</button>
                            <button onClick={() => handleFilter("complete")}className={active === 'complete' ? aactive : notActive}>Completed</button>
                        </div> */}


                        {assignments.map((assignment, index) => (
                            <>
                                <div className='flex items-center justify-center border-b-2 border-gray-300'>
                                    <span className='text-[11px] text-gray-400'>{assignment.startDate}</span>
                                </div>

                                <button key={index} onClick={handleAssignmentbutton}>
                                    <AssignmentBlock name={assignment.name} date={assignment.startDate}/>
                                </button>
                            
                            </>                      
                        ))}
                    </div>

                </div>                
            </div>                
        </>
    )

}

