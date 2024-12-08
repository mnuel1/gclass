import React from "react";
import { Authentication } from "./Authentication";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode
}


export const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
    const {getID, getRole} = Authentication()
    const id = getID();
    const role  = getRole() === "Student" ? "student" : "teacher"
        
    if (id) {        
        return <Navigate to={`/${role}/${id}`} replace />;
    }

    return children;
};