import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TableGrade } from '../../../components/Table/GradeTable';
import useModalStore from '../../../process/Modal/useModalStore';
import useAssignmentStore from '../../../process/Assignment/useAssignmentStore';
import { useGetStudentGradeQuery } from '../process/Assignment/useAssignmentQuery';
import { FailedToast } from '../../../components/Toast/FailedToast';
import { ClassroomTypes } from '../../../process/Classroom/classroomTypes';
import * as XLSX from 'xlsx';
import { Authentication } from '../../../Auth/Authentication';

interface StudentData {
    id: string;
    name: string;
    student_code: string;
    email: string;
    grades: string[];
}

interface StudentsData {
    studentsData: StudentData[];
    col: string[];
}

export const StudentGrades: React.FC = () => {
    const { getID } = Authentication();
    const location = useLocation();
    const classroom: ClassroomTypes = location.state.classroom;

    const { data, isSuccess, isError, isLoading } = useGetStudentGradeQuery(classroom.class_id, getID());
    const { getAssignment } = useAssignmentStore();
    const { startLoading, stopLoading } = useModalStore();

    const [studentGrades, setStudentGrades] = useState<StudentsData>({
        studentsData: [],
        col: [],
    });

    useEffect(() => {
        if (isLoading) {
            startLoading();
        } else {
            stopLoading();
        }

        if (isSuccess && data) {
            getAssignment(data);

            const student = Object.values(data)[0]?.[0]?.fullname;
            const student_code = Object.values(data)[0]?.[0]?.student_code; 
            const email_address = Object.values(data)[0]?.[0]?.email_address;

            const assignmentNames: string[] = [];
            const grades: string[] = [];

            // Flatten the assignments by dates
            Object.entries(data).forEach(([_, assignments]) => {
                assignments.forEach((assignment: any) => {
                    assignmentNames.push(assignment.name); // Collect assignment names
                    grades.push(assignment.grade); // Collect grades for each assignment
                });
            });

            // Set student data in the state
            setStudentGrades({
                studentsData: [
                    {
                        id: getID(),
                        student_code: student_code || '',
                        name: student || '',
                        email: email_address || '',
                        grades,
                    },
                ],
                col: assignmentNames, // Assignment names as columns
            });
        }

        if (isError) {
            FailedToast('Something went wrong!');
        }
    }, [data, isSuccess, getAssignment, isError, isLoading, startLoading, stopLoading]);

    const exportToExcel = () => {
        const worksheetData = [
            ['Student Name', 'Student Code', 'Email', ...studentGrades.col], // Header row with assignment names
        ];

        // Add student data row
        const student = studentGrades.studentsData[0]; // Since only one student
        const row = [student.name, student.student_code, student.email, ...student.grades];
        worksheetData.push(row);

        // Create a new workbook and add the worksheet
        const ws = XLSX.utils.aoa_to_sheet(worksheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Grades');

        // Export to Excel file
        XLSX.writeFile(wb, `${classroom.name}_Grades.xlsx`);
    };

    return (
        <>
            <div className='flex md:items-center justify-between flex-col md:flex-row gap-4 md:gap-0 border-b-2 border-gray-300 px-8 py-4'>
                <h1 className='text-2xl font-bold'>{classroom.name}'s Grades</h1>
                <button
                    onClick={exportToExcel}
                    type='button'
                    className='p-2 rounded-md text-black flex items-center gap-2 hover:bg-blue-200 border border-gray-300'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Export Grades
                </button>
            </div>

            <div className='p-4 m-6 bg-white grow'>
                <TableGrade studentsData={studentGrades} />
            </div>
        </>
    );
};
