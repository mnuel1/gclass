// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Authentication } from "../../../Auth/Authentication";
import {
  useActivityQuery,
  useAddMeeting,
} from "../../../process/Activity/useActivityQuery";
import useActivityStore from "../../../process/Activity/useActivityStore";
import useModalStore from "../../../process/Modal/useModalStore";

import { ClassroomTypes } from "../../../process/Classroom/classroomTypes";

import { PostBlock } from "../../../components/PostBlock/PostBlock";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { MeetModal } from "../../../components/Modal/MeetModal";
import { Button } from "@/components/ui/button";

export const ClassroomView: React.FC = () => {
  const { getUser, getID } = Authentication();
  const [modal, setModal] = useState(false);
  const name = getUser();

  const location = useLocation();

  const classroom: ClassroomTypes = location.state.classroom;

  const { data, isSuccess, isError, isLoading, isEmpty } = useActivityQuery(
    classroom.class_id
  );
  const { activity, getActivity } = useActivityStore();
  const { startLoading, stopLoading } = useModalStore();

  const addMeetingMutation = useAddMeeting();
  const handleScheduleMeeting = (name: string) => {
    stopLoading();

    const data = {
      class_id: classroom.class_id,
      title: name,
    };

    try {
      addMeetingMutation.mutateAsync(data);
    } catch (error) {
      FailedToast("Someting went wrong!");
    } finally {
      localStorage.setItem("meetingName", name || classroom.name);
      window.open(
        `/teacher/${getID()}/class/${classroom.class_id}/meeting`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
    if (isSuccess && data) {
      getActivity(data);
    }
    if (isError) {
      FailedToast("Something went wrong!");
    }
  }, [data, isSuccess, getActivity, isError]);

  return (
    <>
      {modal && (
        <MeetModal
          onSubmit={handleScheduleMeeting}
          onClose={() => setModal(false)}
        />
      )}
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-2xl font-medium tracking-tight text-gray-900">
          {classroom.name}
          <span className="text-sm font-normal text-gray-500 ml-2">Posts</span>
        </h1>
        <Button
          onClick={() => setModal(true)}
          type="button"
          className=" text-white text-xs px-4 h-fit py-2 rounded-xl shadown-none"
        >
          Create New Meeting
        </Button>
      </div>

      <div className="pb-24 mx-4 pt-4 overflow-y-auto h-full pr-4">
        {!isEmpty ? (
          Object.entries(activity).map(([startDate, act]) => (
            <>
              <div
                key={startDate}
                className="flex justify-center items-center border-b-2 border-gray-300"
              >
                <span className="text-[11px] text-gray-400">{startDate}</span>
              </div>

              {Array.isArray(act) &&
                act.map((act, index) => (
                  <PostBlock
                    key={index}
                    teacher_name={name}
                    posts={act.posts}
                    formatted_created_time={act.formatted_created_time}
                    link={act.link}
                  />
                ))}
            </>
          ))
        ) : (
          <>
            <h1 className="m-2 p-2 text-gray-400 text-sm">
              {" "}
              No post yet. <br />
              Create a post by creating an assignment or creating/scheduling a
              meeting.
            </h1>
          </>
        )}
      </div>
    </>
  );
};
