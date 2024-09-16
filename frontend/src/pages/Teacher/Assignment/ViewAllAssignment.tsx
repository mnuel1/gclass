import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import useModalStore from '../../../store/Teacher/Modal/useModalStore'
import useAssignmentStore from '../../../store/Teacher/Assignment/useAssignmentStore'
import { useAssignmentQuery } from '../../../hooks/useAssignmentQuery'

import { ClassroomTypes } from '../../../types/classroomTypes'

import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { AssignmentBlock } from '../../../components/AssignmentBlock/AssignmentBlock'
import { Spinner } from '../../../components/Spinner/spinner'
import { ErrorAlert } from '../../../components/Alert/ErrorAlert'


// const aactive = "rounded-md bg-gray-800 hover:bg-gray-700 p-2 text-white"
// const notActive = "rounded-md bg-gray-600 hover:bg-gray-700 p-2 text-white"

export const Assignments:React.FC = () => {
    // const [active, setActive] = useState("pending")
    const location = useLocation()
    const navigate = useNavigate()    
    const item : ClassroomTypes = location.state.item
    
    const { data, isSuccess, isError, isLoading } = useAssignmentQuery(item.class_id);
    const { assignment, getAssignment } = useAssignmentStore()
    const {    
        isErrorAlertVisible,
        showErrorAlert,
        hideErrorAlert } = useModalStore()

    // const handleFilter = (name : string) => {
    //     setActive(name)
    // }
       

    const handleCreateAssignment = () => {
        navigate(`/teacher/class/${item.teacher_id}/assignments/new`, {state:{item}})
    }

    const handleAssignmentbutton = (assignment_id : string) => {
        navigate(`/teacher/class/${item.teacher_id}/assignments/${assignment_id}/view`, {state:{item}})        
    }

    useEffect(() => {
        
        if (isSuccess && data) {          
            getAssignment(data);            
        }

        if (isError) {            
            showErrorAlert()
        }
    }, [data, isSuccess, getAssignment, isError]);
    return (
        <>
            {isErrorAlertVisible && <ErrorAlert isVisible={isErrorAlertVisible} onClose={hideErrorAlert} title={"Server Error"} 
            body={"An issue occurred. Please try again later. If the problem continues, please contact customer service. Thank you."}/>}
            <Spinner isLoading={isLoading || isError}>
                <div className='flex h-full w-full'>
                    <div className='w-[30%] bg-white '>
                        <ClassroomMenu item={item}/>
                    </div>

                    <div className='w-[70%] bg-white'>
                        <div className='flex items-center justify-between border-b-2 border-gray-300 p-4'>
                        
                            <h1 className='text-2xl font-bold'>{item.name}'s Assignment</h1>
                            <button 
                                type='button' 
                                className='p-2 rounded-md text-black flex 
                                items-center gap-2 hover:bg-blue-200 border border-gray-300'
                                onClick={handleCreateAssignment}
                                > 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>

                                New Assignment
                            </button>
                        </div>
                        

                        <div className='p-4 m-6'>
                            {/* <div className='flex gap-4'>
                                <button onClick={() => handleFilter("pending")}className={active === 'pending' ? aactive : notActive}>Pending</button>
                                <button onClick={() => handleFilter("past")}className={active === 'past' ? aactive : notActive}>Past Due</button>
                                <button onClick={() => handleFilter("complete")}className={active === 'complete' ? aactive : notActive}>Completed</button>
                            </div> */}

                            {Object.entries(assignment).map(([startDate, ass]) => (
                                <>
                                    <div key={startDate} className='flex justify-center items-center border-b-2 border-gray-300'>
                                        <span className='text-[11px] text-gray-400'>{startDate}</span>
                                    </div>
                                   
                                    {ass.map((ass, index) => (
                                        <button onClick={() => handleAssignmentbutton(ass.assignment_id)} className='w-full'>
                                            <AssignmentBlock 
                                                key={index} 
                                                name={ass.name} 
                                                date={ass.formatted_start_date} 
                                                description={ass.instruction}/>
                                        </button>
                                    ))}
                                    
                                </>
                            ))}                           
                        </div>

                    </div>                
                </div>
            </Spinner>
        </>
    )

}

