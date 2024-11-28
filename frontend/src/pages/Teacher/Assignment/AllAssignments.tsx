// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { AssignmentBlock } from "../../../components/AssignmentBlock/AssignmentBlock";
import { Accordion } from "../../../components/Accordion/Accordion";

interface Assignment {
  assignmentId: string;
  classId: string;
  studentIds: string;
  formId: string;
  formAnswers: string;
  assignmentStatus: string;
  passDate: string;
  grade: string;
  attachments: string;
  name: string;
  instructions: string;
  attachment: string;
  points: string;
  startDate: string;
  dueDate: string;
}

interface Assignments {
  [classKey: string]: {
    [date: string]: Assignment[];
  };
}

const assignments: Assignments = {
  "Classroom 1": {
    "Sep 12, 2024": [
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 12, 12:44 PM",
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 12, 12:44 PM",
        dueDate: "",
      },
    ],
    "Sep 13, 2024": [
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 13, 12:44 PM",
        dueDate: "",
      },
    ],
  },
  "Classroom 2": {
    "Sep 12, 2024": [
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 12, 12:44 PM",
        dueDate: "",
      },
    ],
    "Sep 15, 2024": [
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 15, 12:44 PM",
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 15, 12:44 PM",
        dueDate: "",
      },
    ],
  },
  "Classroom 3": {
    "Sep 17, 2024": [
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 17, 12:44 PM",
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 17, 12:44 PM",
        dueDate: "",
      },
    ],
    "Sep 18, 2024": [
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
        instructions: "",
        attachment: "",
        points: "",
        startDate: "Sep 18, 12:44 PM",
        dueDate: "",
      },
    ],
  },
};

export const ViewAllAssignments: React.FC = () => {
  // const [active, setActive] = useState("pending")

  // const allAssignments = assignments.flatMap(obj => Object.values(obj).flat())

  // const sortAssignments = allAssignments.sort((a,b) => {
  //     return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  // })

  // const filterAssigments = sortAssignments.filter(
  //     assignment => assignment.check_status === active
  // )

  // const handleFilter = (name : string) => {
  //     setActive(name)
  // }
  const handleAssignmentbutton = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex h-full w-full">
        <div className="w-full bg-gray-200">
          <div className="border-b-2 border-gray-300 p-4">
            <h1 className="text-2xl font-bold">Assignments</h1>
          </div>

          <div className="p-4 m-6 flex flex-col gap-2">
            {/* <div className='flex gap-4'>
                            <button onClick={() => handleFilter("tograde")}className={active === 'tograde' ? aactive : notActive}>Pending</button>
                            <button onClick={() => handleFilter("returned")}className={active === 'returned' ? aactive : notActive}>Past Due</button>
                            
                        </div> */}

            {Object.entries(assignments).map(([classKey, classes]) => (
              <Accordion name={classKey}>
                {Object.entries(classes).map(([startDate, assigments]) => (
                  <>
                    <div className="flex justify-center items-center border-b-2 border-gray-300">
                      <span className="text-[11px] text-gray-400">
                        {startDate}
                      </span>
                    </div>
                    <button key={startDate} onClick={handleAssignmentbutton}>
                      {assigments.map((assigment, index) => (
                        <AssignmentBlock
                          key={index}
                          description={assigment.instructions}
                          name={assigment.name}
                          date={assigment.startDate}
                        />
                      ))}
                    </button>
                  </>
                ))}
              </Accordion>
            ))}

            {/* {Object.entries(assignments).map((assignment: any, index :number) => (
                            <>
                                

                                <button key={index} onClick={handleAssignmentbutton}>
                                    <AssignmentBlock name={assignment.name} date={assignment.startDate}/>
                                </button>
                            
                            </>                      
                        ))} */}
          </div>
        </div>
      </div>
    </>
  );
};
