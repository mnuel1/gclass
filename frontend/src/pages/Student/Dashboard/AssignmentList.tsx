/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AssignmentBlock } from "@/components/AssignmentBlock/AssignmentBlock";

export const AssignmentList: React.FC<{ assignments?: any; role: string }> = ({
  assignments,
  role,
}) => {
  // Check if assignments is undefined or not an array
  const displayAssignments = Array.isArray(assignments)
    ? assignments.slice(0, 3)
    : assignments && Object.values(assignments)[0]
    ? Object.values(assignments)[0].slice(0, 3)
    : [];

  return (
    <div className="space-y-3">
      {displayAssignments.length > 0 ? (
        displayAssignments.map((assignment) => (
          <AssignmentBlock
            key={assignment.assignment_id}
            ass={assignment}
            name={assignment.name}
            date={assignment.due_date}
            description={assignment.instruction}
            role={role}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No assignments available</p>
      )}
    </div>
  );
};
