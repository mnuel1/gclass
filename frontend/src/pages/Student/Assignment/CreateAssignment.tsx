// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassroomTypes } from "../../../process/Classroom/classroomTypes";
import useMemberStore from "../../../process/Member/useMemberStore";
import useModalStore from "../../../process/Modal/useModalStore";
import { useAddAssignment } from "../../../process/Assignment/useAssignmentQuery";
import { Member } from "../../../process/Member/memberType";
import { useMemberQuery } from "../../../process/Member/useMemberQuery";
import { Accordion } from "../../../components/Accordion/Accordion";
import { FailedToast } from "../../../components/Toast/FailedToast";
interface FormState {
  name: string;
  instructions?: string;
  attachment?: File | null;
  points: string;
  class_id: string;
  date: string;
  time: string;
}

interface ErrorsState {
  name?: string;
  instructions?: string;
  attachment?: string;
  points?: string;
  date?: string;
  time?: string;
  student_ids?: string[];
}

export const CreateAssignment: React.FC = () => {
  const { member, getMember } = useMemberStore();
  const [search, setSearch] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const isInitialized = useRef(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    instructions: "",
    attachment: null,
    points: "100",
    class_id: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().split(" ")[0].slice(0, 5),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const classroom: ClassroomTypes = location.state.classroom;
  const { data, isSuccess, isError, isLoading } = useMemberQuery(
    classroom.class_id
  );
  const [errors, setErrors] = useState<ErrorsState>({});
  const { startLoading, stopLoading } = useModalStore();

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
    if (isSuccess && data) {
      getMember(data);
      if (!isInitialized.current) {
        setMembers(data);
        isInitialized.current = true;
      }
    }

    if (isError) {
      FailedToast("Something went wrong!");
    }
  }, [data, isSuccess, getMember, isError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;
      setForm((prevForm) => ({
        ...prevForm,
        ["attachment"]: file,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleAddMembers = (newMember: Member) => {
    if (!members.some((member) => member.student_id === newMember.student_id)) {
      setMembers([...members, newMember]);
    }
    setSearch("");
  };

  const handleRemoveMember = (student_id: string) => {
    setMembers(members.filter((member) => member.student_id !== student_id));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (form.name.length <= 0) {
      newErrors.name = "Title is required.";
    }

    if (form.points.length <= 0) {
      newErrors.points = "Title is required.";
    }

    if (form.time.length <= 0) {
      newErrors.time = "Time is required.";
    }

    if (form.date.length <= 0) {
      newErrors.date = "Date is required";
    }

    if (members.length <= 0) {
      newErrors.student_ids =
        "You need to assigned a student to this assignment ";
    }

    return newErrors;
  };

  const addAssignmentMutation = useAddAssignment();
  const createTimestamp = () => {
    const formattedDate = form.date.replace(/\//g, "-");
    const dateTimeString = `${formattedDate}T${form.time}`;
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      startLoading();
      const data = {
        assignment_id: "",
        class_id: classroom.class_id,
        name: form.name,
        instruction: form.instructions,
        attachment: form.attachment,
        points: form.points,
        start_date: "",
        due_date: `${createTimestamp()}`,
        modified_time: "",
        formatted_start_date: "",
        student_ids: members,
      };
      addAssignmentMutation.mutate(data);
      window.location.reload();
      navigate(-1);
      stopLoading();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="border-b-2 border-gray-300 p-6 flex justify-between items-center ">
        <h1 className="text-2xl font-bold">New Assignment</h1>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="h-full p-4 m-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">
              Title <span className="text-red-700">*</span>{" "}
            </span>
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-500">Instruction</span>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter instructions"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs italic text-gray-400">
              Add files if neccessary
            </span>
            <input
              type="file"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </div>

          <div>
            <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4">
              <label className="font-bold">Enter name: </label>
              <div className="flex items-center gap-2  w-fit relative">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  className="outline-0 rounded-sm p-2"
                />

                <div
                  className={
                    search.length === 0
                      ? "hidden"
                      : "absolute right-0 top-10 w-full bg-white z-50 shadow-lg border border-gray-200"
                  }
                >
                  {member
                    .filter((student) =>
                      student.fullname
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                    .map((student, index) => (
                      <div
                        key={index}
                        className="hover:bg-gray-200 p-4 border-b border-gray-100"
                      >
                        <button
                          type="button"
                          onClick={() => handleAddMembers(student)}
                        >
                          {student.fullname}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <Accordion name="Added Members">
              {!members.length ? (
                <div className="text-xl my-2 p-4 "> No members yet</div>
              ) : (
                members.map((member, index) => (
                  <>
                    <div key={index} className="flex gap-2 p-4 ">
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.student_id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 text-red-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                      <span className="text-md">{member.fullname}</span>
                    </div>
                  </>
                ))
              )}
            </Accordion>
            {errors.student_ids && (
              <p className="text-red-500 text-sm">{errors.student_ids}</p>
            )}
            <span className="text-sm text-gray-400 italic">
              By default, all students are added in this assignment
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500">
                Points <span className="text-red-700">*</span>{" "}
              </span>
              <input
                type="number"
                name="points"
                value={form.points}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              {errors.points && (
                <p className="text-red-500 text-sm">{errors.points}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500">
                Due Date <span className="text-red-700">*</span>{" "}
              </span>
              <div className="flex max-w-md gap-2">
                <div>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date}</p>
                  )}
                </div>
                <div>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm">{errors.time}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md w-[10rem] text-white hover:bg-blue-600 mt-2"
          >
            Save{" "}
          </button>
        </div>
      </form>
    </>
  );
};
