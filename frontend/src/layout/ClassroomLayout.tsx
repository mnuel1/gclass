import React from "react";
import { Outlet } from "react-router-dom";
import { ClassroomMenu } from "../components/Navbar/ClassroomMenu";

export const ClassroomLayout: React.FC = () => {
  return (
    <>
      <ClassroomMenu>
        <Outlet />
      </ClassroomMenu>
    </>
  );
};
