
import { api } from "../axios";
import { AssignmentType } from "./assignmentType";
export const fetchAssignmentService = async (class_id : string, student_id: string) => {
    const response = await api.get(`student/assignment/${class_id}/${student_id}`);
    
    return response.data.data;
}

export const fetchStudentGradeService = async (class_id : string, student_id: string) => {
    const response = await api.get(`student/assignment/${class_id}/${student_id}/grade`); 
    
    return response.data.data;
}


export const createAssignmentService = async (data: AssignmentType) => {
    return await api.post(`student/assignment`, data)
    
}

export const editAssignmentService = async (data: AssignmentType) => {
    return await api.post(`student/assignment/edit`, data)
    
}

