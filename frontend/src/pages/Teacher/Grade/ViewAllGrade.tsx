
import React from 'react'

import { useLocation } from 'react-router-dom'
import { ClassroomMenu } from '../../../components/Navbar/ClassroomMenu'
import { TableGrade } from '../../../components/Table/GradeTable'
interface item {
    id: string,
    name: string,
    description: string
}

interface StudentData {
    id: string
    name:string
    email:string
    grades: number[]
}

interface StudentsData {    
    studentsData: StudentData[],
    col: string[]
}

const data : StudentData[] = [
    {
        id: "1",
        name: "Student 1",
        email: "email@gmail.com",
        grades: [ 100, 100, 100, 100, 100]
    },
    {
        id: "2",
        name: "Student 2",
        email: "email@gmail.com",
        grades: [ 100, 100, 100, 100, 100]
    },
    {
        id: "3",
        name: "Student 3",
        email: "email@gmail.com",
        grades: [ 100, 100, 100, 100, 100]
    },
    {
        id: "4",
        name: "Student 4",
        email: "email@gmail.com",
        grades: [ 100, 100, 100, 100, 100]
    },
    {
        id: "5",
        name: "Student 5",
        email: "email@gmail.com",
        grades: [ 100, 100, 100, 100, 100]
    },
    
]

const studentGrades : StudentsData  = {
    studentsData: data,
    col: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5' ]
}

export const Grades:React.FC = () => {

    const location = useLocation()
    const classroom : item = location.state.classroom
            
    const getClassroomGrades = () => {
        console.log(location.state.id)
    }

    return (
        <>

            
            <div className='flex md:items-center justify-between flex-col md:flex-row gap-4 md:gap-0 border-b-2 border-gray-300 px-8 py-4'>
            
                <h1 className='text-2xl font-bold'>{classroom.name}'s Grades</h1>

                <button 
                    type='button' 
                    className='p-2 rounded-md text-black flex 
                    items-center gap-2 hover:bg-blue-200 border border-gray-300'
                    
                    > 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Export Grades
                </button>
            </div>

            <div className='p-4 m-6 bg-white grow'>
                <TableGrade studentsData={studentGrades}/>
            </div>

            
        </> 
    )

}