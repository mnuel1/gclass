
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
    const classData : item = location.state.item

    
        
    const getClassroomGrades = () => {
        console.log(location.state.id)
    }

    return (
        <>

            <div className='flex h-full w-full'>

            <div className='w-[30%] bg-white '>
                <ClassroomMenu item={classData}/>
            </div>

            <div className='w-[70%] bg-gray-200 flex flex-col'>
                <div className='border-b-2 border-gray-300 p-4'>
                
                    <h1 className='text-2xl font-bold'>{classData.name}'s Grades</h1>
                </div>

                <div className='p-4 m-6 bg-white grow'>
                    <TableGrade studentsData={studentGrades}/>
                </div>

            </div>




            </div>
        </> 
    )

}