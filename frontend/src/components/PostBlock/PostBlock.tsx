import {
  formatTimeAgo,
  formatToDate,
  formatFirstSentence,
} from "@/utils/formatters";
import { Video } from "lucide-react";
import React from "react";

interface Props {
  teacher_name: string;
  posts: string;
  formatted_created_time: string;
  link: string;
}

export const PostBlock: React.FC<Props> = ({
  teacher_name,
  posts,
  formatted_created_time,
  link,
}) => {
  const date = formatToDate(formatted_created_time);

  const hasAssignment = posts.toLowerCase().includes("assignment");
  const hasMeeting = posts.toLowerCase().includes("meeting");

  const formattedPosts = formatFirstSentence(posts);

  return (
    <>
      <div className="flex gap-4 w-full">
        <div className="flex flex-col space-y-4 my-2 p-4 w-full rounded-xl bg-white">
          <div className="flex gap-3">
            <div
              className="rounded-full w-[40px] flex justify-center 
            p-2 bg-blue-300 font-medium flex-none self-start"
            >
              {" "}
              {teacher_name.charAt(0).toUpperCase()}{" "}
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="text-sm">{teacher_name}</h1>
              <span className="text-[0.7rem] opacity-60">
                Posted {formatTimeAgo(date)}
              </span>
            </div>
          </div>
          <div>
            {hasAssignment && (
              <span className="text-[0.7rem] px-4 py-1 border opacity-60 rounded-full">
                Assignment
              </span>
            )}
            {hasMeeting && (
              <span className="text-[0.7rem] px-4 py-1 border opacity-60 rounded-full">
                Meeting
              </span>
            )}
          </div>
          <div className="flex flex-col rounded-lg w-full">
            <div dangerouslySetInnerHTML={{ __html: formattedPosts }} />
            {link && (
              <a
                href={link}
                className="mt-4 p-2 rounded-lg flex md:h-[12rem] h-[8rem] justify-end items-end text-sm
                           text-white"
                style={{
                  backgroundImage: `url("/images/meeting.avif")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="p-2 flex gap-2 items-center">
                  <Video size={16} />
                  Join Meeting
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
