// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreModal } from "../Modal/More";
import { Clipboard } from "../Clipboard/Clipboard";
import { ClassroomTypes } from "../../process/Classroom/classroomTypes";
import { fetchBackgroundImage } from "../../utils/imageCache";
import { Authentication } from '../../Auth/Authentication'
import {
  FileText,
  BookOpen,
  BarChart2,
  Users,
  Calendar,
  LayoutDashboard,
} from "lucide-react";

const activeIcon =
  "p-2 bg-blue-500 text-white rounded-full shadow-lg transform scale-110 transition-all duration-300";
const notActiveIcon =
  "p-2 text-gray-500 group-hover:bg-blue-500 group-hover:text-white group-hover:rounded-full group-hover:shadow-lg group-hover:scale-110 transition-all duration-300";

type MainMenuProps = {
  children: React.ReactNode;
};

export const ClassroomMenu: React.FC<MainMenuProps> = ({ children }) => {
  const { getRole } = Authentication()
  const [classroom, setClassroom] = useState<ClassroomTypes | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const navigate = useNavigate();

  const length = window.location.href.split("/").length;
  const isStudent = getRole() === "Student" ? true : false;
 
  useEffect(() => {
    const storedClassroom = localStorage.getItem("selectedClassroom");
    if (storedClassroom) {
      const parsedClassroom = JSON.parse(storedClassroom);
      setClassroom(parsedClassroom);
      const loadImage = async () => {
        const image = await fetchBackgroundImage(
          parsedClassroom.class_id,
          parsedClassroom.name
        );
        setBackgroundImage(image);
      };
      loadImage();
    }
  }, []);

  const navigateTo = (route: string) => {
    if (!classroom) return;
    navigate(`${classroom.class_id}/${route}`, { state: { classroom } });
  };

  const routes = [
    {
      name: "dashboard",
      icon: <LayoutDashboard size={18} />,
      showAlways: false,
    },
    {
      name: "posts",
      icon: <FileText size={18} />,
      showAlways: true,
    },
    {
      name: "assignments",
      icon: <BookOpen size={18} />,
      showAlways: true,
    },
    {
      name: "grades",
      icon: <BarChart2 size={18} />,
      showAlways: true,
    },
    {
      name: "schedule",
      icon: <Calendar size={18} />,
      showAlways: false,
    },
    {
      name: "members",
      icon: <Users size={18} />,
      showAlways: true,
    },
  ];

  const filteredRoutes = routes.filter((route) => {

    if (route.name === "schedule" && isStudent) {
      return false;
    }
    if (route.name === "dashboard" && !isStudent ) {
      return false;
    }
    return route.showAlways || sessionStorage.getItem("role") !== "Student";
  });
  
  return (
    <div className="flex h-full w-full bg-slate-100">
      <div className="flex flex-col gap-4 ml-4 my-4 rounded-xl h-[calc(100vh-7rem)] z-0 w-[30%] md:w-[300px] p-4 bg-white">
        <div className="flex items-center justify-between pb-2 relative border-b border-gray-200">
          <div className="flex w-full flex-col sm:flex-row items-center justify-between">
            <h1 className="text-md md:text-xl font-bold">{classroom?.name}</h1>            
            <div className="flex">
              <Clipboard class_code={classroom?.class_string_id || ""} />
              {!isStudent && 
                <MoreModal
                  class_id={classroom?.class_id || ""}
                  name={classroom?.name || ""}
                  description={classroom?.description || ""}
                />
              }
            </div>
          </div>
        </div>

        <div
          className={`h-[4rem] md:h-[15rem] transition-all duration-300 rounded-xl ${
            backgroundImage ? "bg-cover bg-center" : "bg-green-600"
          }`}
          style={
            backgroundImage
              ? { backgroundImage: `url(${backgroundImage})` }
              : {}
          }
        />

        <div className="flex flex-col py-4 border-y border-gray-200 p-2 space-y-2 overflow-hidden">
          <p className="uppercase text-[0.7rem] opacity-60 mb-2">Menu</p>
          {filteredRoutes.map((route) => (
            <button
              key={route.name}
              type="button"
              className={`text-sm text-left flex items-center gap-2 text-gray-500 group ${
                window.location.href.includes(route.name) ? "font-semibold" : ""
              }`}
              onClick={() => navigateTo(route.name)}
            >
              <div
                className={
                  window.location.href.includes(route.name)
                    ? activeIcon
                    : notActiveIcon
                }
              >
                {route.icon}
              </div>
	      <p className="hidden md:block">
		{route.name === "schedule"
                 ? "Schedule Meeting"
	         : route.name.charAt(0).toUpperCase() + route.name.slice(1)}
	      </p>
              
            </button>
          ))}
        </div>
      </div>
      <div className="w-full overflow-hidden h-[calc(100vh-75px)]">
        {children}
      </div>
    </div>
  );
};
