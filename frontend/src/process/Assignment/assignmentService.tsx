
import { api } from "../axios";
import { AssignmentType } from "./assignmentType";
export const fetchAssignmentService = async (class_id : string) => {
    const response = await api.get(`teacher/assignment/${class_id}`); 
    
    return response.data.data;
}

export const fetchStudentGradeService = async (class_id : string) => {
    const response = await api.get(`teacher/assignment/${class_id}/grade`); 
    
    return response.data.data;
}

export const createAssignmentService = async (data: AssignmentType) => {
    const response = await api.post(`teacher/assignment`, data)
    return response;
}

export const gradeAssignmentService = async (data: AssignmentType) => {
    const response = await api.post(`teacher/assignment/grade`, data)
    return response;
}

export const getAssignStudentsWorkService = async (assignment_id: string) => {
    const response = await api.get(`assignment/${assignment_id}/view`)
    return response.data.data;
}

export const editAssignmentService = async (data: AssignmentType) => {
    const response = await api.post(`teacher/assignment/edit`, data)
    return response;
}

export const deleteAssignmentService = async (assignment_id: string) => {
    return await api.post(`teacher/assignment/remove/${assignment_id}`)
}