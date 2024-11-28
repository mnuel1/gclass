/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import useModalStore from "../../../process/Modal/useModalStore";
import useClassroomStore from "../../Student/process/Classroom/useClassroomStore";
import {
  useClassroomQuery,
  useJoinClassroom,
} from "../../Student/process/Classroom/useClassroomQuery";
import { Classroom } from "../../../components/Classroom/Classroom";
import { JoinModal } from "../../../components/Modal/JoinModal";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { Authentication } from "../../../Auth/Authentication";
import { Button } from "@/components/ui/button";

export const StudentHome: React.FC = () => {
  const { getID } = Authentication();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess, isError, isLoading } = useClassroomQuery();

  const { classrooms, getClassrooms } = useClassroomStore();
  const {
    joinModalOpen,
    openJoinModal,
    closeJoinModal,
    startLoading,
    stopLoading,
  } = useModalStore();

  const totalPages = Math.ceil(classrooms.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClassrooms = classrooms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }

    if (isSuccess && data) {
      getClassrooms(data);
    }

    if (isError) {
      FailedToast("Something went wrong!");
    }
  }, [data, isSuccess, getClassrooms, isError]);

  useEffect(() => {
    if (currentClassrooms.length === 0 && classrooms.length > 0) {
      // Adjust the page when there are no classrooms on the current page
      handlePageChange(currentPage !== 1 ? currentPage - 1 : currentPage + 1);
    }
  }, [currentClassrooms, classrooms, currentPage, handlePageChange]);

  const joinClassMutation = useJoinClassroom();
  const handleJoinClass = (data: any) => {
    // console.log(data);

    joinClassMutation.mutate(data);
    // window.location.reload();
  };
  return (
    <>
      {joinModalOpen && (
        <JoinModal
          onClose={closeJoinModal}
          id={getID()}
          onSubmit={handleJoinClass}
        />
      )}

      <div className="flex flex-col h-[calc(100vh-4.5rem)] bg-slate-100">
        <div className="bg-slate-100">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-4xl font-bold">Classes</h1>
            <div className="flex gap-2">
              <Button
                onClick={openJoinModal}
                type="button"
                className=" text-white  px-4 h-fit py-2 rounded-xl shadown-none"
              >
                Join New Class
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 flex-col md:flex-row px-6 bg-slate-100 grow">
          {classrooms.length === 0 ? (
            <div className="flex flex-col gap-2">
              <h1 className="text-lg">
                No classes yet. If you have a class ID, go join now!.
              </h1>
              <div className="flex gap-2">
                <Button
                  onClick={openJoinModal}
                  type="button"
                  className=" text-white  px-4 h-fit py-2 rounded-xl shadown-none"
                >
                  Join New Class
                </Button>
              </div>
            </div>
          ) : currentClassrooms.length === 0 ? (
            <h1 className="text-lg">No classes available on this page.</h1>
          ) : (
            <div className="bg-white p-4 w-full h-full rounded-xl">
              {currentClassrooms.map((item, index) => (
                <Classroom key={index} classroom={item} />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center p-6">
          <ol className="flex gap-1 text-xs font-medium">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>

            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li key={pageNumber + 1}>
                <button
                  onClick={() => handlePageChange(pageNumber + 1)}
                  className={`block size-8 rounded text-center leading-8 ${
                    currentPage === pageNumber + 1
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border border-gray-100 bg-white text-gray-900"
                  }`}
                >
                  {pageNumber + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};
