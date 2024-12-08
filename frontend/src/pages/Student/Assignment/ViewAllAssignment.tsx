import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useModalStore from "../../../process/Modal/useModalStore";
import useAssignmentStore from "../process/Assignment/useAssignmentStore";
import { useAssignmentQuery } from "../process/Assignment/useAssignmentQuery";

import { FailedToast } from "../../../components/Toast/FailedToast";
import { AssignmentBlock } from "../../../components/AssignmentBlock/AssignmentBlock";
import { AssignmentType } from "../../../process/Assignment/assignmentType";
import { Authentication } from "../../../Auth/Authentication";
import { Button } from "@/components/ui/button";

const activeStyle = "text-white rounded-xl shadow-none h-fit py-0.5";
const notActiveStyle =
  "rounded-xl bg-transparent border border-primary shadow-none hover:text-white h-fit py-0.5";

export const StudentAssignments: React.FC = () => {
  const [active, setActive] = useState("Pending"); // Default to 'Pending'
  const { getID } = Authentication();
  const location = useLocation();
  const navigate = useNavigate();

  const classroom = location.state.classroom;

  const { data, isSuccess, isError, isLoading, isEmpty } = useAssignmentQuery(
    classroom.class_id,
    getID()
  );
  const { assignment, getAssignment } = useAssignmentStore();
  const { startLoading, stopLoading } = useModalStore();

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
    if (!isEmpty && isSuccess && data) {
      getAssignment(data);
      stopLoading();
    }

    if (isError) {
      FailedToast("Something went wrong!");
    }
  }, [data, isSuccess, getAssignment, isError, isLoading]);

  const handleFilter = (status: string) => {
    setActive(status);
  };

  const handleAssignmentButton = (assignment: AssignmentType) => {
    stopLoading();

    navigate(`${assignment.assignment_id}/view`, {
      state: { assignment: assignment, classroom: classroom },
    });
  };

  // Filtering assignments based on the active filter (assignment_status)
  const filteredAssignments = () => {
    if (!assignment || isEmpty) return [];

    return Object.entries(assignment).map(([date, assignments]) => {
      const filteredAss = assignments.filter(
        (ass: any) => ass.assignment_status === active
      );

      if (filteredAss.length > 0) {
        return (
          <div key={date}>
            <div className="flex justify-center items-center border-b-2 mb-4 border-gray-300">
              <span className="text-[11px] text-gray-400">{date}</span>
            </div>
            {filteredAss.map((ass: any, index: number) => (
              <button
                key={index}
                onClick={() => handleAssignmentButton(ass)}
                className="w-full"
              >
                <AssignmentBlock
                  ass={ass}
                  name={ass.name}
                  date={ass.formatted_start_date}
                  description={ass.instruction || ""}
                  role="Student"
                />
              </button>
            ))}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between mx-auto px-4 py-4">
        <h1 className="text-2xl font-medium tracking-tight text-gray-900">
          {classroom.name}         
        </h1>
 	<span className="text-sm font-normal text-gray-500 ml-2">
          Assignments
        </span>
      </div>

      <div className="mx-4">
        <div className="flex gap-1 flex-wrap my-4">
          <Button
            onClick={() => handleFilter("Pending")}
            className={active === "Pending" ? activeStyle : notActiveStyle}
          >
            Pending
          </Button>
          <Button
            onClick={() => handleFilter("Turned In")}
            className={active === "Turned In" ? activeStyle : notActiveStyle}
          >
            Turned In
          </Button>
          <Button
            onClick={() => handleFilter("Late Turned In")}
            className={
              active === "Late Turned In" ? activeStyle : notActiveStyle
            }
          >
            Late Turned In
          </Button>
          <Button
            onClick={() => handleFilter("Not Turned In")}
            className={
              active === "Not Turned In" ? activeStyle : notActiveStyle
            }
          >
            Not Turned In
          </Button>
          <Button
            onClick={() => handleFilter("Returned")}
            className={active === "Returned" ? activeStyle : notActiveStyle}
          >
            Returned
          </Button>
        </div>
	<div className="pb-64 h-[70vh] overflow-y-auto overflow-hidden">
        {!isEmpty ? (
          filteredAssignments()
        ) : (
          <h1 className="m-2 p-2 text-gray-400 text-sm">
            {" "}
            No assignments yet.{" "}
          </h1>
        )}
	</div>
      </div>
    </>
  );
};
