import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClassroomTypes } from "../../process/Classroom/classroomTypes";
import useClassroomStore from "../../pages/Student/process/Classroom/useClassroomStore";
import { fetchBackgroundImage } from "../../utils/imageCache";

const avatarColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

export const Classroom: React.FC<{ classroom: ClassroomTypes }> = ({
  classroom,
}) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const navigate = useNavigate();
  const { selectClassroom } = useClassroomStore();

  useEffect(() => {
    const loadImage = async () => {
      const image = await fetchBackgroundImage(
        classroom.class_id,
        classroom.name
      );
      setBackgroundImage(image);
    };
    loadImage();
  }, [classroom.class_id, classroom.name]);

  const navigateToClassroom = () => {
    selectClassroom(classroom);
    navigate(`${classroom.class_id}/posts`, { state: { classroom } });
  };

  const renderAvatars = () => {
    const maxAvatars = 6;
    const students = classroom.class_students || [];
    const avatarsToShow = students.slice(0, maxAvatars);
    const extraCount = students.length - maxAvatars;

    return (
      <>
        {avatarsToShow.map((student, index) => (
          <div
            key={student.student_id}
            className={`w-8 h-8 ${
              avatarColors[index % avatarColors.length]
            } text-white rounded-full flex items-center justify-center text-sm font-bold`}
            style={{ marginLeft: index === 0 ? 0 : -10 }}
            title={`${student.first_name} ${student.last_name}`}
          >
            {student.last_name.charAt(0)}
          </div>
        ))}
        {extraCount > 0 && (
          <div
            className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
            style={{ marginLeft: -10 }}
            title={`+${extraCount} more`}
          >
            +{extraCount}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`flex flex-col w-full h-[10rem] md:w-[15rem] md:h-[12rem]`}>
      <div
        className={`relative h-full cursor-pointer bg-green-600 transition-all rounded-lg duration-300 ${
          backgroundImage ? "bg-cover bg-center" : ""
        }`}
        style={
          backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}
        }
        onClick={navigateToClassroom}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-lg"></div>
        <div className="relative flex flex-col gap-2 p-4 justify-end h-full">
          <h1 className="text-lg text-white">{classroom.name}</h1>
          <div className="flex">{renderAvatars()}</div>
        </div>
      </div>
    </div>
  );
};
