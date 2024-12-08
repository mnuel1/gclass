import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { ClassroomTypes } from "../../../process/Classroom/classroomTypes";
import { AssignmentType } from "../../../process/Assignment/assignmentType";
import useModalStore from "../../../process/Modal/useModalStore";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { SERVER } from "../../../process/axios";
// import { Accordion } from "../../../components/Accordion/Accordion";
import { Authentication } from "../../../Auth/Authentication";
import { SuccessToast } from "../../../components/Toast/SuccessToast";
import { ConfirmModal } from "../../../components/Modal/ConfirmModal";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock } from "lucide-react";
import { DragDropFileUpload } from "@/components/ui/drag-drop-file-uploads";
import { AttachmentSection } from "@/components/ui/file-preview";

interface ErrorsState {
  attachment?: string;
}

export const StudentViewAssignment: React.FC = () => {
  const { getID } = Authentication();
  const location = useLocation();
  const navigate = useNavigate();
  // const classroom: ClassroomTypes = location.state.classroom;
  const ass: AssignmentType = location.state.assignment;
  const [errors, setErrors] = useState<ErrorsState>({});
  const [form, setForm] = useState({
    attachment: ass.attachment,
  });
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { startLoading, stopLoading } = useModalStore();

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value, type } = e.target;

  //   if (type === "file") {
  //     const fileInput = e.target as HTMLInputElement;
  //     const file = fileInput.files ? fileInput.files[0] : null;
  //     setForm((prevForm) => ({
  //       ...prevForm,
  //       ["attachment"]: file,
  //     }));
  //   } else {
  //     setForm((prevForm) => ({
  //       ...prevForm,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleDownload = () => {
    if (ass.attachments) {
      const fileUrl = `${SERVER}/${ass.attachments}`;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download =
        ass.attachments.split("/").pop() || "assignment-attachment";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (form.attachment.length <= 0) {
      newErrors.attachment = "Attach your answers here.";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("assignment_id", ass.assignment_id);
      formData.append("student_id", getID());
      formData.append("status", ass.assignment_status);
      formData.append("attachment", form.attachment);

      try {
        startLoading();
        const response = await fetch(
          "https://api.actsclassroom.online/student/upload/assignment",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.status === 201) {
          FailedToast(
            "You cannot submit the assignment because the due date has passed."
          );
          stopLoading();
          return;
        }

        if (response.status === 200) {
          SuccessToast("Assignment Submitted!");
          stopLoading();
          window.location.reload();
          navigate(-1);
        } else {
          FailedToast("Submit assignment failed!");
          stopLoading();
        }
      } catch (error) {
        FailedToast("Something went wrong!");
        stopLoading();
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const isReturned = ass.assignment_status === "Returned";
  const isTurnedIn = ass.assignment_status === "Turned In";
  const isPending = ass.assignment_status === "Pending";
  const isNotTurnedIn = ass.assignment_status === "Not Turned In";
  const isLate = new Date() > new Date(ass.due_date);
  const renderSubmitButton = () => (
    <Button
      onClick={() => setConfirm(true)}
      type="button"
      className="text-white"
      size="sm"
    >
      {isLate
        ? "Late Turned In"
        : isTurnedIn
        ? "Turned In again"
        : isPending
        ? "Turned In"
        : isNotTurnedIn
        ? "Late Turned In"
        : ""}
    </Button>
  );

  return (
    <>
      {confirm && (
        <ConfirmModal
          onClose={() => setConfirm(false)}
          id=""
          onConfirm={handleSubmit}
        />
      )}
      <div className="flex items-center justify-between px-4 py-4">
        <Button
          variant="link"
          className="text-black px-0"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
          <span className="text-blue-700">Back</span>
        </Button>
        {isNotTurnedIn ? (
          <div className="flex items-center gap-2 text-xs italic h-9 px-4 py-2">
            {" "}
            <Clock size={14} className="text-blue-700" />
            Not Turned In{" "}
          </div>
        ) : (
          <></>
        )}
      </div>

      <form action="" className="h-[80vh] overflow-hidden">
        <div className="h-full overflow-y-auto pb-40 mx-4 flex flex-col gap-6 px-6 py-4 bg-white rounded-xl">
          <div className="flex flex-col gap-2 ">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col mb-4">
                <h2 className="font-semibold text-2xl md:text-3xl">
                  {ass.name}
                </h2>
                <span className="text-sm opacity-60">Due {ass.due_date}</span>
              </div>
              <div className="text-sm mt-1">
                <p className="text-xs font-medium opacity-50">Points</p>
                <h2>{ass.points} possible</h2>
              </div>
            </div>

            <div className="text-sm mt-1">
              <p className="text-xs font-medium opacity-50">Instructions</p>
              {ass.instruction ? (
                <h2>{ass.instruction}</h2>
              ) : (
                <p className="text-gray-500 italic">
                  No instructions provided for this assignment.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {ass.attachments && (
              <AttachmentSection
                attachments={ass.attachments}
                handleDownload={handleDownload}
              />
            )}
            {!ass.attachments && (
              <>
                <p className="text-xs font-medium opacity-50">
                  Insert your answer here.
                </p>
                {!ass.attachments && (
                  <DragDropFileUpload
                    onFileChange={(file) =>
                      setForm((prevForm) => ({
                        ...prevForm,
                        attachment: file,
                      }))
                    }
                    error={errors.attachment}
                  />
                )}
              </>
            )}
          </div>

          <>
            {!isReturned && (
              <div className="flex flex-col sm:flex-row gap-2">
                {!isTurnedIn && <>{renderSubmitButton()}</>}

                {(isTurnedIn || isLate) && ass.attachments && !edit && (
                  <>
                    <Button
                      onClick={() => setEdit(true)}
                      type="button"
                      className="text-white px-6"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </>
                )}

                {(isTurnedIn || isLate) && edit && (
                  <>
                    {renderSubmitButton()}
                    <Button
                      onClick={() => setEdit(false)}
                      type="button"
                      size="sm"
                      className="text-white"
                    >
                      Cancel Edit
                    </Button>
                  </>
                )}
              </div>
            )}
          </>
        </div>
      </form>
    </>
  );
};
