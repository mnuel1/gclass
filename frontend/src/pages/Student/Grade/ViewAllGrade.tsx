// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TableGrade } from "../../../components/Table/GradeTable";
import useModalStore from "../../../process/Modal/useModalStore";
import useAssignmentStore from "../../../process/Assignment/useAssignmentStore";
import { useGetStudentGradeQuery } from "../process/Assignment/useAssignmentQuery";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { ClassroomTypes } from "../../../process/Classroom/classroomTypes";
import * as XLSX from "xlsx";
import { Authentication } from "../../../Auth/Authentication";
import { Button } from "@/components/ui/button";

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

  const { data, isSuccess, isError, isLoading } = useGetStudentGradeQuery(
    classroom.class_id,
    getID()
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
            student_code: student_code || "",
            name: student || "",
            email: email_address || "",
            grades,
          },
        ],
        col: assignmentNames, // Assignment names as columns
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

    // Add student data row
    const student = studentGrades.studentsData[0]; // Since only one student
    const row = [
      student.name,
      student.student_code,
      student.email,
      ...student.grades,
    ];
    worksheetData.push(row);

    // Create a new workbook and add the worksheet
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Grades");

    // Export to Excel file
    XLSX.writeFile(wb, `${classroom.name}_Grades.xlsx`);
  };

  return (
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
      </div>
      <div className="mx-4">
        <TableGrade studentsData={studentGrades} role="student" />
      </div>
    </div>
  );
};
