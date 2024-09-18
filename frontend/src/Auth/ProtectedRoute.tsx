import React from "react";
import { Authentication } from "./Authentication";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode
}


export const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
    const {getID} = Authentication()
    const teacherId = getID();

    if (teacherId) {
        // Redirect to the teacher layout if teacherId exists
        return <Navigate to={`/teacher/${teacherId}`} replace />;
    }

    return children;
};