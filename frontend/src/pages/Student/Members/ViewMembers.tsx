import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Users, ChevronDown } from "lucide-react";
import useMemberStore from "../process/Member/useMemberStore";
import { useMemberQuery } from "../process/Member/useMemberQuery";
import useModalStore from "../../../process/Modal/useModalStore";
import { ClassroomTypes } from "../../../process/Classroom/classroomTypes";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { Accordion } from "../../../components/Accordion/Accordion";

export const StudentMembers: React.FC = () => {
  const location = useLocation();
  const classroom: ClassroomTypes = location.state.classroom;
  const { data, isSuccess, isError, isLoading } = useMemberQuery(
    classroom.class_id
  );
  const { member, getMember } = useMemberStore();
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

  return (
    <div className="min-h-[calc(100vh-4.5rem)]">
      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900">
            {classroom.name}
            <span className="text-sm font-normal text-gray-500 ml-2">
              Members
            </span>
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{member.length + 1} members</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Teacher Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="mb-4">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teacher
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${getInitialsColor(
                    classroom.teacher_name
                  )}`}
                >
                  {classroom.teacher_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {classroom.teacher_name}
                  </div>
                  <div className="text-sm text-gray-500">Class Owner</div>
                </div>
              </div>
            </div>
          </div>

          {/* Students Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </span>
              <span className="text-sm text-gray-500">
                {member.length} {member.length === 1 ? "student" : "students"}
              </span>
            </div>

            {member.length !== 0 ? (
              <div className="space-y-4">
                {member.map((student, index) => (
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
                        <div className="font-medium text-gray-900">
                          {student.fullname}
                        </div>
                        <div className="text-sm text-gray-500">
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
};
