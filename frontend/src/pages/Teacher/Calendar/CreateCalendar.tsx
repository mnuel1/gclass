import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import { useAddMeeting } from "../../../process/Calendar/useCalendarQuery";
import { ClassroomTypes } from "../../../process/Classroom/classroomTypes";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormState {
  title: string;
  description?: string;
  time: string;
  date: string;
  class_id: string;
  start_date: string;
}
interface ErrorsState {
  title?: string;
  description?: string;
  time?: string;
  date?: string;
}

export const CreateSchedule: React.FC = () => {
  const [errors, setErrors] = useState<ErrorsState>({});
  const location = useLocation();
  const classroom: ClassroomTypes = location.state.classroom;

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    time: "",
    date: "",
    start_date: "",
    class_id: classroom.class_id,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (form.title.length <= 0) {
      newErrors.title = "Title is required.";
    }

    if (form.time.length <= 0) {
      newErrors.time = "Time is required.";
    }

    if (form.date.length <= 0) {
      newErrors.date = "Date is required";
    }

    return newErrors;
  };

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
  const addMeetingMutation = useAddMeeting();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      form.start_date = createTimestamp();
      addMeetingMutation.mutate(form);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="px-4 py-4 flex justify-between items-center ">
        <h1 className="text-2xl font-medium tracking-tight text-gray-900">
          Schedule
          <span className="text-sm font-normal text-gray-500 ml-2">
            Meeting
          </span>
        </h1>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="mx-4 py-4 px-6 bg-white rounded-xl flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">
              Title <span className="text-red-700">*</span>{" "}
            </Label>
            <div>
              <Input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="text-sm"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-500">
              When <span className="text-red-700">*</span>{" "}
            </Label>
            <div className="flex max-w-md gap-2">
              <div>
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="text-sm"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date}</p>
                )}
              </div>
              <div>
                <Input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="text-sm"
                />
                {errors.time && (
                  <p className="text-red-500 text-sm">{errors.time}</p>
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="text-white px-6 w-fit mt-2">
            Schedule
          </Button>
        </div>
      </form>
    </>
  );
};
