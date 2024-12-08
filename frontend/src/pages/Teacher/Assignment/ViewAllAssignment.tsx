import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useModalStore from "../../../process/Modal/useModalStore";
import useAssignmentStore from "../../../process/Assignment/useAssignmentStore";
import { useAssignmentQuery } from "../../../process/Assignment/useAssignmentQuery";

import { FailedToast } from "../../../components/Toast/FailedToast";
import { AssignmentBlock } from "../../../components/AssignmentBlock/AssignmentBlock";
import { AssignmentType } from "../../../process/Assignment/assignmentType";
import { Button } from "@/components/ui/button";

// const aactive = "rounded-md bg-gray-800 hover:bg-gray-700 p-2 text-white"
// const notActive = "rounded-md bg-gray-600 hover:bg-gray-700 p-2 text-white"

export const Assignments: React.FC = () => {
  // const [active, setActive] = useState("pending")
  const location = useLocation();
  const navigate = useNavigate();

  const classroom = location.state.classroom;

  const { data, isSuccess, isError, isLoading, isEmpty } = useAssignmentQuery(
    classroom.class_id
  );
  const { assignment, getAssignment } = useAssignmentStore();
  const { startLoading, stopLoading } = useModalStore();


  // const handleFilter = (name : string) => {
  //     setActive(name)
  // }

  const handleCreateAssignment = () => {
    stopLoading();
    navigate(`new`, { state: { classroom } });
  };

  const handleAssignmentbutton = (assignment: AssignmentType) => {
    stopLoading();
    navigate(`${assignment.assignment_id}/view`, {
      state: { assignment: assignment, classroom: classroom },
    });
  };

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

  return (
    <>
      <div className="flex items-center justify-between flex-col md:flex-row px-4 py-4">
        <h1 className="text-2xl font-medium tracking-tight text-gray-900">
          {classroom.name}
          <span className="text-sm font-normal text-gray-500 ml-2">
            Assignments
          </span>
        </h1>
        <Button
          onClick={handleCreateAssignment}
          type="button"
          className="self-center md:self-auto text-white text-xs px-4 h-fit py-2 rounded-xl shadown-none"
        >
          Create New Assignment
        </Button>
      </div>

      <div className="mx-4 h-[75vh] pb-24">
        <div className="h-full flex flex-wrap my-4 overflow-y-auto">
          {!isEmpty ? (
            Object.entries(assignment).map(([startDate, ass]) => (
              <>
                <div className="flex justify-center items-center border-b-2 mb-4 border-gray-300 w-full">
                  <span className="text-[11px] text-gray-400">{startDate}</span>
                </div>

                {ass.map((ass, index) => (
                  <button
                    onClick={() => handleAssignmentbutton(ass)}
                    className="w-full"
                  >
                    <AssignmentBlock
                      key={index}
                      ass={ass}
                      name={ass.name}
                      date={ass.formatted_start_date}
                      description={ass.instruction || ""}
                      role="Teacher"
                    />
                  </button>
                ))}
              </>
            ))
          ) : (
            <>
              <h1 className="m-2 p-2 text-gray-400 text-sm">
                {" "}
                No assignments yet.
                <span
                  onClick={handleCreateAssignment}
                  className="cursor-pointer text-blue-500 hover:text-blue-600 m-2 font-semibold"
                >
                  You can create your first assignment here.
                </span>
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};
