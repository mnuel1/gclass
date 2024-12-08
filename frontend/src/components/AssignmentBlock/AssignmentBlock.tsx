// @ts-nocheck
import React from "react";
import {
  BookOpen,
  PenTool,
  Database,
  Code,
  Calculator,
  FileText,
  TestTube,
  Brain,
  Microscope,
  Library,
} from "lucide-react";

interface Props {
  ass: any;
  name: string;
  date: string;
  description: string;
  role: string;
}

const schoolIcons = [
  BookOpen,
  PenTool,
  Database,
  Code,
  Calculator,
  FileText,
  TestTube,
  Brain,
  Microscope,
  Library,
] as const;

const getBadgeStyle = (status: string, role: string) => {
  if (role.toLowerCase() !== "student") return;

  switch (status.toLowerCase()) {
    case "turned in":
      return "bg-green-100 text-green-800 border-green-200";
    case "late turned in":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "not turned in":
      return "bg-red-100 text-red-800 border-red-200";
    case "returned":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getBadgeText = (status: string, role: string) => {
  if (role.toLowerCase() !== "student") return;

  switch (status.toLowerCase()) {
    case "turned in":
      return "Submitted";
    case "late turned in":
      return "Late Submission";
    case "not turned in":
      return "Missing";
    case "returned":
      return "Graded";
    default:
      return "Not Submitted";
  }
};

export const AssignmentBlock: React.FC<Props> = ({
  ass,
  name,
  date,
  description,
  role,
}) => {
  const iconIndex =
    typeof ass.assignment_id === "string"
      ? ass.assignment_id
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        schoolIcons.length
      : Number(ass.assignment_id) % schoolIcons.length;

  const Icon = schoolIcons[iconIndex];
  const badgeStyle = getBadgeStyle(ass.assignment_status, role);
  const badgeText = getBadgeText(ass.assignment_status, role);

  return (
    <>
      <div className="flex items-center gap-2 my-2 w-full cursor-pointer overflow-hidden">
        <div className="flex flex-col bg-slate-200 p-3 rounded-md w-full border border-gray-300 overflow-x-auto">
          <div className="flex flex-col sm:flex-row items-start md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="size-9 p-1.5 bg-white rounded-full border border-gray-300 text-primary" />
              <div className="flex flex-col items-start">
                <h1 className="text-xs md:text-md font-bold text-left leading-4">{name}</h1>
                <span className="text-xs text-gray-400">{date}</span>
              </div>
            </div>
            {/* For md screens and up - use flex column div */}
            {role.toLowerCase() === "student" && (
              <div className="md:flex flex-col items-center hidden">
                <p className="text-sm">
                  {ass.assignment_status.toLowerCase() !== "returned" ? (
                    <span className=" text-xs md:text-md text-gray-500">Not Graded</span>
                  ) : (
                    <span className="text-xs md:text-md font-bold ">{ass.grade}</span>
                  )}{" "}
                  / {ass.points}
                </p>
                <span className="text-xs md:text-md md:block hidden text-xs opacity-60">
                  Your Grade
                </span>
              </div>
            )}
            <div
              className={`text-xs px-2 py-1 rounded-full border md:block hidden ${badgeStyle}`}
            >
              {badgeText}
            </div>

            {/* smaller screens */}
            <div className="md:hidden flex flex-col items-end gap-1">
              {role.toLowerCase() === "student" && (
                <div className="flex flex-col items-center">
                  <p className="text-sm">
                    {ass.assignment_status.toLowerCase() !== "returned" ? (
                      <span className=" text-xs md:text-md text-gray-500">Not Graded</span>
                    ) : (
                      <span className="text-xs md:text-md font-bold ">{ass.grade}</span>
                    )}{" "}
                    / {ass.points}
                  </p>
                  <span className="text-xs md:text-md md:block hidden text-xs opacity-60">
                    Your Grade
                  </span>
                </div>
              )}
              <div
                className={`text-xs px-2 py-1 rounded-full border ${badgeStyle}`}
              >
                {badgeText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
