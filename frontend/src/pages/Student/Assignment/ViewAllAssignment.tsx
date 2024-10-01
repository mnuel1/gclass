import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useModalStore from '../../../process/Modal/useModalStore'
import useAssignmentStore from '../process/Assignment/useAssignmentStore'
import { useAssignmentQuery } from '../process/Assignment/useAssignmentQuery'

import { FailedToast } from '../../../components/Toast/FailedToast'
import { AssignmentBlock } from '../../../components/AssignmentBlock/AssignmentBlock'
import { AssignmentType } from '../../../process/Assignment/assignmentType'
import { Authentication } from '../../../Auth/Authentication'

const activeStyle = "rounded-md border-2 border-blue-200 p-2 text-black"
const notActiveStyle = "rounded-md border border-gray-200 hover:border-blue-200 p-2 text-black"

export const StudentAssignments: React.FC = () => {
    const [active, setActive] = useState("Pending") // Default to 'Pending'
    const { getID } = Authentication()
    const location = useLocation()
    const navigate = useNavigate()

    const classroom = location.state.classroom
    
    const { data, isSuccess, isError, isLoading, isEmpty } = useAssignmentQuery(classroom.class_id, getID());
    const { assignment, getAssignment } = useAssignmentStore()
    const { startLoading, stopLoading } = useModalStore()

    useEffect(() => {
        if (isLoading) {
            startLoading()
        } else {
            stopLoading()
        }
        if (!isEmpty && isSuccess && data) {
            getAssignment(data);
            stopLoading()
        }

        if (isError) {
            FailedToast("Something went wrong!")
        }
    }, [data, isSuccess, getAssignment, isError, isLoading])

    const handleFilter = (status: string) => {
        setActive(status)
    }

    const handleAssignmentButton = (assignment: AssignmentType) => {
        stopLoading()
        navigate(`${assignment.assignment_id}/view`, { state: { assignment: assignment, classroom: classroom } })
    }

    // Filtering assignments based on the active filter (assignment_status)
    const filteredAssignments = () => {
        if (!assignment || isEmpty) return []

        return Object.entries(assignment).map(([date, assignments]) => {            
            const filteredAss = assignments.filter((ass: any) => ass.assignment_status === active)

            if (filteredAss.length > 0) {
                return (
                    <div key={date}>
                        <div className='flex justify-center items-center border-b-2 border-gray-300'>
                            <span className='text-[11px] text-gray-400'>{date}</span>
                        </div>
                        {filteredAss.map((ass: any, index: number) => (
                            <button key={index} onClick={() => handleAssignmentButton(ass)} className='w-full'>
                                <AssignmentBlock 
                                    name={ass.name} 
                                    date={ass.formatted_start_date} 
                                    description={ass.instruction || ""}/>
                            </button>
                        ))}
                    </div>
                )
            }
            return null
        })
    }

    return (
        <>            
            <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
                <h1 className='text-2xl font-bold'>{`${classroom.name}'s Assignments`.toUpperCase()}</h1>                
            </div>

            <div className='p-4 m-6'>
                <div className='flex gap-4'>
                    <button onClick={() => handleFilter("Pending")} className={active === 'Pending' ? activeStyle : notActiveStyle}>Pending</button>
                    <button onClick={() => handleFilter("Turned In")} className={active === 'Turned In' ? activeStyle : notActiveStyle}>Turned In</button>
                    <button onClick={() => handleFilter("Late Turned In")} className={active === 'Late Turned In' ? activeStyle : notActiveStyle}>Late Turned In</button>
                    <button onClick={() => handleFilter("Not Turned In")} className={active === 'Not Turned In' ? activeStyle : notActiveStyle}>Not Turned In</button>
                    <button onClick={() => handleFilter("Returned")} className={active === 'Returned' ? activeStyle : notActiveStyle}>Returned</button>
                </div>

                {!isEmpty ? filteredAssignments() : (
                    <h1 className='m-2 p-2 text-gray-400 text-sm'> No assignments yet. </h1>
                )}
            </div>
        </>
    )
}
