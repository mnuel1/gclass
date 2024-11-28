// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Authentication } from "@/Auth/Authentication";
import { FailedToast } from "@/components/Toast/FailedToast";
import useAssignmentStore from "@/process/Assignment/useAssignmentStore";
import { useAssignmentQuery } from "../process/Assignment/useAssignmentQuery";
import { ClassroomTypes } from "@/process/Classroom/classroomTypes";
import useModalStore from "@/process/Modal/useModalStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { AssignmentList } from "./AssignmentList";
import { useActivityQuery } from "@/process/Activity/useActivityQuery";
import useActivityStore from "@/process/Activity/useActivityStore";
import ActivityFeed from "./ActivityList";
import { Calendar } from "@/components/ui/calendar";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import useMemberStore from "@/process/Member/useMemberStore";
import { useMemberQuery } from "@/process/Member/useMemberQuery";

interface GradesByStatus {
  status: string;
  grade: number;
}

interface AssignmentMetrics {
  returnedCount: number;
  totalGrade: number;
  gradesByStatus: GradesByStatus[];
  dueActivities: { name: string; status: string; dueDate: string }[];
}

export default function StudentViewDashboard() {
  const location = useLocation();
  const classId = location.state.classroom.class_id;

  const { getID } = Authentication();
  const classroom: ClassroomTypes = location.state.classroom;
  const profLastName = classroom.teacher_name.split(" ")[1];

  const {
    data: assignmentsData,
    isSuccess: isAssignmentSuccess,
    isError: isAssignmentError,
    isLoading: isAssignmentLoading,
    isEmpty: isAssignmentEmpty,
  } = useAssignmentQuery(classroom.class_id, getID());

  const {
    data: activityData,
    isSuccess: isActivitySuccess,
    isError: isActivityError,
    isLoading: isActivityLoading,
    isEmpty: isActivityEmpty,
  } = useActivityQuery(classroom.class_id);

  const {
    data: membersData,
    isSuccess: isMemberSuccess,
    isError: isMemberError,
  } = useMemberQuery(classroom.class_id);

  const { getAssignment } = useAssignmentStore();
  const { getActivity } = useActivityStore();
  const { getMember } = useMemberStore();
  const { startLoading, stopLoading } = useModalStore();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [metrics, setMetrics] = useState<AssignmentMetrics>({
    returnedCount: 0,
    totalGrade: 0,
    gradesByStatus: [],
    dueActivities: [],
  });

  const getInitialsColor = (name: string) => {
    const colors = [
      "bg-blue-500/10 text-blue-600",
      "bg-purple-500/10 text-purple-600",
      "bg-rose-500/10 text-rose-600",
      "bg-amber-500/10 text-amber-600",
      "bg-emerald-500/10 text-emerald-600",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  useEffect(() => {
    if (isAssignmentLoading || isActivityLoading) {
      startLoading();
    } else {
      stopLoading();
    }

    if (!isAssignmentEmpty && isAssignmentSuccess && assignmentsData) {
      const assignments: any[] = Object.values(assignmentsData)[0];

      const calculatedMetrics = assignments.reduce(
        (acc, assignment) => {
          // Count returned assignments
          if (assignment.assignment_status === "Returned") {
            acc.returnedCount++;
          }

          // Calculate total grade
          acc.totalGrade += assignment.grade;

          // Track grades by status
          const statusIndex = acc.gradesByStatus.findIndex(
            (item) => item.status === assignment.assignment_status
          );
          if (statusIndex === -1) {
            acc.gradesByStatus.push({
              status: assignment.assignment_status,
              grade: assignment.grade,
            });
          } else {
            acc.gradesByStatus[statusIndex].grade += assignment.grade;
          }

          // Track due activities
          if (
            assignment.assignment_status === "Not Turned In" ||
            assignment.assignment_status === "Late Turned In"
          ) {
            acc.dueActivities.push({
              name: assignment.name,
              status: assignment.assignment_status,
              dueDate: assignment.due_date,
            });
          }

          return acc;
        },
        {
          returnedCount: 0,
          totalGrade: 0,
          gradesByStatus: [],
          dueActivities: [],
        }
      );

      setMetrics(calculatedMetrics);
      getAssignment(assignments);
    }

    if (!isActivityEmpty && isActivitySuccess && activityData) {
      const activities: any[] = Object.values(activityData)[0];
      getActivity(activities);
    }

    if (isMemberSuccess && membersData) {
      getMember(membersData);
    }

    if (isAssignmentError || isActivityError || isMemberError) {
      FailedToast("Something went wrong!");
    }
  }, [
    assignmentsData,
    activityData,
    membersData,
    isAssignmentSuccess,
    isActivitySuccess,
    isMemberSuccess,
    getAssignment,
    getActivity,
    getMember,
    isAssignmentError,
    isActivityError,
    isMemberError,
    isAssignmentLoading,
    isActivityLoading,
  ]);

  const currentWeekStart = startOfWeek(selectedDate);
  const currentWeekEnd = endOfWeek(selectedDate);

  const hideBefore = addDays(currentWeekStart, -7);
  const hideAfter = addDays(currentWeekEnd, 7);

  const modifiers = {
    hideDays: {
      before: hideBefore,
      after: hideAfter,
    },
  };

  const modifiersStyles = {
    hideDays: {
      display: "none",
    },
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Returned":
        return "bg-green-100 text-green-800";
      case "Late Turned In":
        return "bg-yellow-100 text-yellow-800";
      case "Not Turned In":
        return "bg-red-100 text-red-800";
      case "Turned In":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] w-full bg-slate-100 overflow-y-auto">
      <div className="bg-slate-100">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900">
            Dashboard
            <span className="text-sm font-normal text-gray-500 ml-2">
              {classroom.name}
            </span>
          </h1>
        </div>
        <div className="mx-4 grid lg:grid-cols-[1fr_0.3fr] gap-4 grid-cols-1">
          <div className="lg:block flex gap-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              // onSelect={(date) => date && setSelectedDate(date)}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-xl bg-white lg:row-start-1 lg:col-start-2 lg:hidden block"
            />
            <div className="px-4 py-5 bg-white rounded-xl lg:h-[12rem] col-start-1">
              <div className="grid grid-cols-3 gap-4 h-full">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="p-4 rounded-lg cursor-pointer flex items-center justify-center flex-col text-center text-white"
                        style={{
                          backgroundImage: "url(/images/due-bg.jpg)",
                          backgroundSize: "cover",
                        }}
                      >
                        <p className="text-2xl lg:text-4xl font-bold">
                          {metrics.dueActivities.length}
                        </p>
                        <p className="text-sm ">Due Activities</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-2">
                        {metrics.dueActivities.map((activity, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="mr-4">{activity.name}</span>
                            <span
                              className={`
                            px-2 py-1 rounded text-xs 
                            ${
                              activity.status === "Late Turned In"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          `}
                            >
                              {activity.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div
                  className="p-4 rounded-lg text-zinc-900 flex items-center justify-center flex-col text-center"
                  style={{
                    backgroundImage: "url(/images/returned-bg.jpg)",
                    backgroundSize: "cover",
                  }}
                >
                  <p className="text-2xl lg:text-4xl font-bold">
                    {metrics.returnedCount}
                  </p>
                  <p className="text-sm ">Returned Assignments</p>
                </div>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="p-4 cursor-pointer rounded-lg text-zinc-900 flex items-center justify-center flex-col text-center"
                        style={{
                          backgroundImage: "url(/images/points-bg.avif)",
                          backgroundSize: "cover",
                        }}
                      >
                        <p className="text-2xl lg:text-4xl font-bold">
                          {metrics.totalGrade}
                        </p>
                        <p className="text-sm ">Total Grade</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-2">
                        {metrics.gradesByStatus.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span className="mr-4">{item.status}</span>
                            <span
                              className={`
                            px-2 py-1 rounded text-xs 
                            ${getStatusColor(item.status)}
                          `}
                            >
                              {item.grade} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 bg-white rounded-xl col-start-1">
            <div className="w-full flex justify-between mb-4 items-center">
              <h1 className="font-semibold text-lg lg:text-2xl">
                Your assignments
              </h1>
              <NavLink
                to={`/student/${getID()}/class/${classId}/assignments`}
                state={{ classroom: classroom }}
              >
                <Button
                  variant="ghost"
                  className="p-0 text-xs opacity-60 h-fit"
                >
                  Show all <ChevronRight size={14} />
                </Button>
              </NavLink>
            </div>
            <AssignmentList assignments={assignmentsData} role="student" />
          </div>
          <div className="px-4 py-5 bg-white rounded-xl col-start-1">
            <div className="w-full flex justify-between mb-4 items-center">
              <h1 className="font-semibold text-lg lg:text-2xl">
                Posts from your Prof. {profLastName}
              </h1>
              <NavLink
                to={`/student/${getID()}/class/${classId}/posts`}
                state={{ classroom: classroom }}
              >
                <Button
                  variant="ghost"
                  className="p-0 text-xs opacity-60 h-fit"
                >
                  Show all <ChevronRight size={14} />
                </Button>
              </NavLink>
            </div>
            <ActivityFeed activities={activityData} />
          </div>
          {/*  */}
          <Calendar
            mode="single"
            selected={selectedDate}
            // onSelect={(date) => date && setSelectedDate(date)}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-xl bg-white lg:row-start-1 lg:col-start-2 w-full h-full hidden lg:flex items-center justify-center"
          />
          <div className="px-4 py-5 bg-white rounded-xl lg:col-start-2 lg:row-start-2 lg:row-end-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-semibold text-lg lg:text-2xl">Classmates</h1>
            </div>

            {membersData.length !== 0 ? (
              <div className="space-y-4">
                {membersData.map((student: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 group hover:bg-gray-50 rounded-lg transition-colors duration-200 px-2"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${getInitialsColor(
                          student.fullname
                        )}`}
                      >
                        {student.fullname[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {student.fullname}
                        </div>
                        <div className="text-xs text-gray-500">
                          Joined {student.created_time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400">No students have joined yet</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
