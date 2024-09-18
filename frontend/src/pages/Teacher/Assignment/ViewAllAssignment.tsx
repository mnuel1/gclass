import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useModalStore from '../../../process/Modal/useModalStore'
import useAssignmentStore from '../../../process/Assignment/useAssignmentStore'
import { useAssignmentQuery } from '../../../process/Assignment/useAssignmentQuery'


import { AssignmentBlock } from '../../../components/AssignmentBlock/AssignmentBlock'
import { AssignmentType } from '../../../process/Assignment/assignmentType'

// const aactive = "rounded-md bg-gray-800 hover:bg-gray-700 p-2 text-white"
// const notActive = "rounded-md bg-gray-600 hover:bg-gray-700 p-2 text-white"

export const Assignments:React.FC = () => {
    // const [active, setActive] = useState("pending")
    const location = useLocation()
    const navigate = useNavigate()

    const classroom = location.state.classroom
    
    const { data, isSuccess, isError, isLoading, isEmpty } = useAssignmentQuery(classroom.class_id);
    const { assignment, getAssignment } = useAssignmentStore()
    const {            
        showErrorAlert,
        startLoading,
        stopLoading } = useModalStore()

    // const handleFilter = (name : string) => {
    //     setActive(name)
    // }
       
    const handleCreateAssignment = () => {
        stopLoading()
        navigate(`new`, {state:{classroom}})
    }

    const handleAssignmentbutton = (assignment : AssignmentType) => {
        stopLoading()
        navigate(`${assignment.assignment_id}/view`, {state:{assignment: assignment, classroom: classroom}})        
    }

    useEffect(() => {
        if (isLoading) {
            startLoading()
        } else{
            stopLoading()
        }
        if (!isEmpty && isSuccess && data) {          
            getAssignment(data);
            stopLoading()
        }

        if (isError) {            
            showErrorAlert()
        }
    }, [data, isSuccess, getAssignment, isError, isLoading]);
    return (
        <>            
            <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
            
                <h1 className='text-2xl font-bold'>{`${classroom.name}'s Assignments`.toUpperCase()}</h1>
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

                {!isEmpty ? ( Object.entries(assignment).map(([startDate, ass]) => (
                    <>
                        <div key={startDate} className='flex justify-center items-center border-b-2 border-gray-300'>
                            <span className='text-[11px] text-gray-400'>{startDate}</span>
                        </div>
                        
                        {ass.map((ass, index) => (
                            <button onClick={() => handleAssignmentbutton(ass)} className='w-full'>
                                <AssignmentBlock 
                                    key={index} 
                                    name={ass.name} 
                                    date={ass.formatted_start_date} 
                                    description={ass.instruction || ""}/>
                            </button>
                        ))}
                        
                    </>
                ))) : (
                    <>
                        <h1 className='m-2 p-2 text-gray-400 text-sm'> No assignments yet.  
                            <span onClick={handleCreateAssignment} 
                                className='cursor-pointer text-blue-500 hover:text-blue-600 m-2 font-semibold'>
                                You can create your first assignment here.
                            </span>
                        </h1>
                    </>

                )

                }                           
            </div>
        </>
    )

}

