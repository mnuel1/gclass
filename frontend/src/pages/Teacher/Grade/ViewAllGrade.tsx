import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TableGrade } from "../../../components/Table/GradeTable";
import useModalStore from "../../../process/Modal/useModalStore";
import useAssignmentStore from "../../../process/Assignment/useAssignmentStore";
import { useGetStudentGradeQuery } from "../../../process/Assignment/useAssignmentQuery";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { ClassroomTypes } from "../../../process/Classroom/classroomTypes";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";

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

  const { data, isSuccess, isError, isLoading } = useGetStudentGradeQuery(
    classroom.class_id
  );
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
      console.log(data);

      const studentMap: { [key: string]: StudentData } = {};
      const assignmentNames: Set<string> = new Set();

      Object.values(data).forEach((assignments) => {
        assignments.forEach((assignment) => {
          assignment.students.forEach((student) => {
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
            studentMap[student.student_id].grades.push(
              parseFloat(student.grade)
            ); // Store grades as numbers

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
  }, [
    data,
    isSuccess,
    getAssignment,
    isError,
    isLoading,
    startLoading,
    stopLoading,
  ]);

  const exportToExcel = () => {
    const worksheetData = [
      ["Student Name", "Student Code", "Email", ...studentGrades.col], // Header row with assignment names
    ];

    // Add student data rows
    studentGrades.studentsData.forEach((student) => {
      const row = [
        student.name,
        student.student_code,
        student.email,
        ...student.grades,
      ];
      worksheetData.push(row);
    });

    // Create a new workbook and add the worksheet
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Grades");

    // Export to Excel file
    XLSX.writeFile(wb, `${classroom.name}_Grades.xlsx`);
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-4.5rem)] bg-slate-100">
        <div className="bg-slate-100">
          <div className="flex items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-medium tracking-tight text-gray-900">
              {classroom.name}
              <span className="text-sm font-normal text-gray-500 ml-2">
                Grades
              </span>
            </h1>
            <Button
              onClick={exportToExcel}
              type="button"
              className=" text-white text-xs px-4 h-fit py-2 rounded-xl shadown-none"
            >
              Export Grades
            </Button>
          </div>

          <div className="mx-4">
            <TableGrade studentsData={studentGrades} role="teacher" />
          </div>
        </div>
      </div>
    </>
  );
};
