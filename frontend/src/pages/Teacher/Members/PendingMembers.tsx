// @ts-nocheck

// import { Accordion } from "@/components/Accordion/Accordion";
import { FailedToast } from "@/components/Toast/FailedToast";
import { api } from "@/process/axios";
import { useAddMember, useRemoveMember } from "@/process/Member/useMemberQuery";
import useModalStore from "@/process/Modal/useModalStore";
import { useEffect, useState } from "react";

const getInitialsColor = (name: string) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600",
    "bg-yellow-100 text-yellow-600",
    "bg-purple-100 text-purple-600",
    "bg-pink-100 text-pink-600",
  ];
  const index = name.length % colors.length;
  return colors[index];
};

export const PendingMembers = ({ class_id }) => {
  const [member, getMember] = useState([]);
  const { startLoading, stopLoading } = useModalStore();

  useEffect(() => {
    const getPendingMembers = async () => {
      try {
        startLoading();

        const response = await api.get(`/teacher/pending/member/${class_id}`);

        if (response.status !== 200) {
          FailedToast("Something went wrong");
          stopLoading();
          return;
        }
        getMember(response.data.data);

        stopLoading();
      } catch (error) {
        console.error("Error fetching teachers:", error);
        FailedToast("An error occurred while fetching teachers.");
        stopLoading();
      }
    };
    getPendingMembers();
  }, []);

  const addMembersMutation = useAddMember();
  const handleAddSave = (id, student) => {
    const data = {
      class_id: id,
      members: [student],
    };
    console.log(data);
    addMembersMutation.mutate(data);
  };

  const removeMemberMutation = useRemoveMember();
  const handleRemoveSave = (id, student) => {
    const data = {
      class_id: id,
      members: [student],
    };
    console.log(data);

    removeMemberMutation.mutate(data);
    window.location.reload();
  };

  return (
    <div className="p-4 bg-white rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Students Requesting to Join
        </span>
        <span className="text-sm text-gray-500">
          {member.length} {member.length === 1 ? "student" : "students"}
        </span>
      </div>

      {member.length > 0 ? (
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
                <div className="font-medium text-gray-900">
                  {student.fullname}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="text-white text-xs px-4 h-fit py-2 rounded-xl shadown-none bg-green-600 hover:bg-green-700 transition-colors"
                  onClick={() => handleAddSave(class_id, student)}
                >
                  Accept
                </button>
                <button
                  className="text-red-600 bg-transparent text-xs px-4 h-fit py-2 rounded-xl shadown-none border border-red-600"
                  onClick={() => handleRemoveSave(class_id, student)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400">No pending join requests</div>
        </div>
      )}
    </div>
  );
};
