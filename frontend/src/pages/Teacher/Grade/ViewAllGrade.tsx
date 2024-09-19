import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TableGrade } from '../../../components/Table/GradeTable';
import useModalStore from '../../../process/Modal/useModalStore';
import useAssignmentStore from '../../../process/Assignment/useAssignmentStore';
import { useAssignmentQuery } from '../../../process/Assignment/useAssignmentQuery';
import { FailedToast } from '../../../components/Toast/FailedToast';
import { ClassroomTypes } from '../../../process/Classroom/classroomTypes';

interface StudentData {
    id: string;
    name: string;
    student_code: string;
    email: string;
    grades: number[];
}

interface StudentsData {
    studentsData: StudentData[];
    col: string[];
}

export const Grades: React.FC = () => {
    const location = useLocation();
    const classroom: ClassroomTypes = location.state.classroom;

    const { data, isSuccess, isError, isLoading, isEmpty } = useAssignmentQuery(classroom.class_id);
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

            const studentMap: { [key: string]: StudentData } = {};
            const assignmentNames: Set<string> = new Set();

            Object.values(data).forEach(assignments => {
                assignments.forEach(assignment => {
                    assignment.students.forEach(student => {
                        // Create or update student entry
                        if (!studentMap[student.student_id]) {
                            studentMap[student.student_id] = {
                                id: student.student_id,
                                student_code: student.student_code || "",
                                name: student.fullname,
                                email: student.email_address,
                                grades: [],
                            };
                        }
                        studentMap[student.student_id].grades.push(parseFloat(student.grade)); // Store grades as numbers

                        // Add assignment name to the set
                        assignmentNames.add(assignment.name);
                    });
                });
            });

            setStudentGrades({
                studentsData: Object.values(studentMap),
                col: Array.from(assignmentNames),
            });
        }

        if (isError) {
            FailedToast("Something went wrong!");
        }
    }, [data, isSuccess, getAssignment, isError, isLoading, startLoading, stopLoading]);

    return (
        <>
            <div className='flex md:items-center justify-between flex-col md:flex-row gap-4 md:gap-0 border-b-2 border-gray-300 px-8 py-4'>
                <h1 className='text-2xl font-bold'>{classroom.name}'s Grades</h1>
                <button
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
