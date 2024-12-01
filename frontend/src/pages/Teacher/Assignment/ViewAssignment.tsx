// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { SERVER } from "../../../process/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassroomTypes } from "../../../process/Classroom/classroomTypes";
import { AssignmentType } from "../../../process/Assignment/assignmentType";
import useMemberStore from "../../../process/Member/useMemberStore";
import useModalStore from "../../../process/Modal/useModalStore";
import {
  useEditAssignment,
  useDeleteAssignment,
  useGradeAssignment,
} from "../../../process/Assignment/useAssignmentQuery";
import { Member } from "../../../process/Member/memberType";
import { useMemberQuery } from "../../../process/Member/useMemberQuery";
import { DeleteAssignmentModal } from "../../../components/Modal/DeleteAssignmentModal";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { FilePreview } from "@/components/ui/file-preview";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, Trash, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchInput } from "./SearchInputStudent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ErrorsState {
  name?: string;
  instructions?: string;
  attachment?: string;
  points?: string;
  date?: string;
  time?: string;
  student_ids?: string[];
}
const activeStyle = "text-white rounded-xl shadow-none h-fit py-0.5";
const notActiveStyle =
  "rounded-xl bg-transparent border border-primary shadow-none hover:text-white h-fit py-0.5";

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

export const ViewAssignment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classroom: ClassroomTypes = location.state.classroom;
  const ass: AssignmentType = location.state.assignment;
  const { member, getMember } = useMemberStore();
  const [active, setActive] = useState("Turned In");
  const [search, setSearch] = useState<string>("");
  const [members, setMembers] = useState(ass.students);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [grades, setGrades] = useState<any>({});

  const [dialogOpen, setDialogOpen] = useState(false);

  const [form, setForm] = useState({
    name: ass.name,
    instructions: ass.instruction,
    attachment: ass.attachment,
    points: ass.points,
    class_id: ass.class_id,
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().split(" ")[0].slice(0, 5),
  });

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

    if (members && members.length <= 0) {
      newErrors.student_ids =
        "You need to assigned a student to this assignment ";
    }

    return newErrors;
  };

  const editAssignmentMutation = useEditAssignment();
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
      const data = {
        assignment_id: ass.assignment_id,
        class_id: ass.class_id,
        name: form.name,
        instruction: form.instructions,

        points: form.points,
        start_date: "",
        due_date: `${createTimestamp()}`,
        modified_time: "",
        formatted_start_date: "",
        students: members,
        student_ids: members,
        past_student_ids: ass.students,
      };

      const formData = new FormData();
      formData.append("assignment_id", ass.assignment_id);
      formData.append("attachment", form.attachment);

      try {
        if (form.attachment && form.attachment instanceof File) {
          const response = await fetch(`${SERVER}/teacher/upload/assignment`, {
            method: "POST",
            body: formData,
          });

          if (response.status === 200) {
            editAssignmentMutation.mutate(data);
            window.location.reload();
            navigate(-1);
          } else {
            FailedToast("Something went wrong!");
          }
        } else {
          editAssignmentMutation.mutate(data);
          window.location.reload();
          navigate(-1);
        }
      } catch (error) {
        FailedToast("Something went wrong!");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleEditAssignment = () => {
    setEdit((prev) => !prev);
  };
  const deleteAssignmentMutation = useDeleteAssignment();
  const handleRemoveAssignment = (assignment_id: string) => {
    deleteAssignmentMutation.mutate(assignment_id);
    window.location.reload();
    navigate(-1);
  };

  const handleFilter = (status: string) => {
    setActive(status);
  };
  const handleGradeChange = (e: any, student_id: string) => {
    const { value } = e.target;
    setGrades({
      ...grades,
      [student_id]: value, // Update the grade for the specific student
    });
  };
  const gradeAssignmentMutation = useGradeAssignment();
  const handleGradeAssignment = (student_id: string) => {
    const grade = grades[student_id];
    if (!grade) {
      FailedToast("Enter a grade first before returning");
      return;
    }
    const data = {
      student_id: student_id,
      grade: grade,
      assignment_id: ass.assignment_id,
    };
    gradeAssignmentMutation.mutate(data);
    console.log(`Submitting grade ${grade} for student ${student_id}`);
  };
  const filteredStudents = ass.students?.filter(
    (student) => student.assignment_status === active
  );

  const renderAvatars = () => {
    const maxAvatars = 6;
    const studentsToShow = members?.slice(0, maxAvatars) || [];
    const extraCount = members ? members.length - maxAvatars : 0;

    return (
      <div className="flex items-center">
        {studentsToShow.map((student, index) => (
          <div
            key={student.student_id}
            className={`w-8 h-8 ${
              avatarColors[index % avatarColors.length]
            } text-white rounded-full flex items-center justify-center text-sm font-bold cursor-pointer`}
            style={{ marginLeft: index === 0 ? 0 : -10 }}
            title={student.fullname}
          >
            {student.fullname.charAt(0)}
          </div>
        ))}
        {extraCount > 0 && (
          <div
            className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
            style={{ marginLeft: -10 }}
            title={`+${extraCount} more`}
          >
            +{extraCount}
          </div>
        )}
      </div>
    );
  };

  const handleAddMembers = (memberr: Member) => {
    if (!members?.some((member) => member.student_id === memberr.student_id)) {
      setMembers([...(members ?? []), memberr]);
    }
    setSearch("");
  };

  const handleRemoveMember = (student_id: string) => {
    setMembers(members?.filter((member) => member.student_id !== student_id));
  };

  const MembersDialog = () => (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4">
          Manage Members
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assignment Members</DialogTitle>
          <DialogDescription>
            Manage students assigned to this assignment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <SearchInput onAdd={handleAddMembers} disabled={!edit} />

          <div className="space-y-2 mt-8">
            <Label>Current Members ({members?.length || 0})</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {members?.map((member) => (
                <div
                  key={member.student_id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <span>{member.fullname}</span>
                  {edit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(member.student_id)}
                      className="hover:bg-red-100 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const handleDownload = (attachment) => {
    window.open(`${SERVER}/${attachment}`, "_blank")
  }
  return (
    <>
      {del && (
        <DeleteAssignmentModal
          onClose={() => setDel(false)}
          onSubmit={handleRemoveAssignment}
          assignment_id={ass.assignment_id}
        />
      )}

      <div className="flex items-center justify-between px-4 py-4">
        <Button
          variant="link"
          className="text-black p-0"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
          <span className="text-blue-700">Back</span>
        </Button>
        <div className="flex gap-2">
          <Button
            type="button"
            className="text-white"
            onClick={handleEditAssignment}
          >
            <Edit />
            Edit
          </Button>
          <Button type="button" variant="outline" onClick={() => setDel(true)}>
            <Trash />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="classwork" className="w-full">
        <TabsList className="grid w-fit grid-cols-2 h-full mx-4">
          <TabsTrigger value="classwork">Classwork</TabsTrigger>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value="classwork" className="h-[75vh] ">
          <form
            action=""
            className="grow overflow-y-auto h-full mx-4 px-8 bg-white rounded-xl pt-6"
            onSubmit={handleSubmit}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>
                    Title <span className="text-red-700">*</span>{" "}
                  </Label>
                  <Input
                    disabled={!edit}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label>Instruction</Label>
                  <Textarea
                    disabled={!edit}
                    name="instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    placeholder="Enter instructions"
                  />
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-4">
                  <div className="space-y-2">
                    <Label>
                      Points <span className="text-red-700">*</span>{" "}
                    </Label>
                    <Input
                      disabled={!edit}
                      name="points"
                      value={form.points}
                      onChange={handleChange}
                    />
                    {errors.points && (
                      <p className="text-red-600 text-xs">{errors.points}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Due Date <span className="text-red-700">*</span>{" "}
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          disabled={!edit}
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                        />
                        {errors.date && (
                          <p className="text-red-600 text-xs">{errors.date}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          disabled={!edit}
                          type="time"
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          placeholder="Enter email"
                        />
                        {errors.time && (
                          <p className="text-red-600 text-xs">{errors.time}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {ass.attachment && !edit && (
                    <Accordion name="Attachment Preview">
                      {ass.attachment.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <img
                          src={`${SERVER}/${ass.attachment}`}
                          alt={`Preview of ${ass.assignment_id}`}
                          style={{
                            width: "100%",
                            maxWidth: "600px",
                            height: "auto",
                          }}
                        />
                      ) : ass.attachment.match(/\.pdf$/i) ? (
                        <iframe
                          src={`${SERVER}/${ass.attachment}`}
                          width="100%"
                          height="600px"
                          title="PDF Preview"
                        />
                      ) : (
                        <p>Preview not available for this file type.</p>
                      )}
                    </Accordion>
                  )}
                  {!ass.attachment ||
                    (edit && (
                      <>
                        <span className="text-xs italic text-gray-400">
                          Add files if neccessary
                        </span>
                        <input
                          disabled={edit ? false : true}
                          type="file"
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        />
                        {errors.attachment && (
                          <p className="text-red-600 text-xs">
                            {errors.attachment}
                          </p>
                        )}
                      </>
                    ))}
                </div>

                <div className="space-y-4">
                  <Label>Assigned Members</Label>
                  <div className="flex items-center">
                    {renderAvatars()}
                    <MembersDialog />
                  </div>
                  {errors.student_ids && (
                    <p className="text-red-600 text-xs">{errors.student_ids}</p>
                  )}
                  <span className="text-xs text-gray-400 italic block">
                    By default, all students are added to this assignment
                  </span>
                </div>
              </div>

              <div className="pb-2 self-end">
                <Button
                  disabled={!edit}
                  type="submit"
                  className="mb-6 px-8 text-white"
                >
                  Save{" "}
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="assignment">
          <div className="h-full mx-4 flex flex-col gap-4 overflow-y-auto pb-12">
            <div className="flex gap-1 flex-wrap my-4">
              <Button
                onClick={() => handleFilter("Turned In")}
                className={
                  active === "Turned In" ? activeStyle : notActiveStyle
                }
              >
                Turned In
              </Button>
              <Button
                onClick={() => handleFilter("Pending")}
                className={active === "Pending" ? activeStyle : notActiveStyle}
              >
                Pending
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
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredStudents?.map((student, index) => (
                <React.Fragment key={index}>
                  <AccordionItem
                    key={student.student_id}
                    value={`student-${student.student_id}`}
                    className="border border-gray-200 bg-white rounded-lg"
                  >
                    <AccordionTrigger className="px-4">
                      {student.fullname}'s Work
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 ">
                      {student.assignment_status === "Pending" ||
                      student.assignment_status === "Not Turned In" ? (
                        <h1>{student.fullname} doesn't have work yet</h1>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <Label className="text-sm text-gray-500">
                              Grade:
                            </Label>
                            <Input
                              name={`grading-${student.student_id}`}
                              value={grades[student.student_id] || ""}
                              onChange={(e) =>
                                handleGradeChange(e, student.student_id)
                              }
                              className="w-fit"
                            />
                          </div>

                          <FilePreview
                            filePath={`${SERVER}/${student.attachments}`}
                            onDownload={() => {handleDownload(student.attachments)}}
                          />

                          <Button
                            onClick={() =>
                              handleGradeAssignment(student.student_id)
                            }
                            size={"sm"}
                            // variant={"outline"}
                            className="shadow-none text-white px-6"
                          >
                            Return
                          </Button>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </React.Fragment>
              ))}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
