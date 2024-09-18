
import { api } from "../axios";
import { AssignmentType } from "./calendarType";
export const fetchAssignmentService = async (class_id : string) => {
    const response = await api.get(`teacher/assignment/${class_id}`); 
    
    return response.data.data;
}

export const createAssignmentService = async (data: AssignmentType) => {
    return await api.post(`teacher/assignment`, data)
}

export const editAssignmentService = async (data: AssignmentType) => {
    return await api.post(`teacher/assignment/edit`, data)
}

export const deleteAssignmentService = async (assignment_id: string) => {
    return await api.post(`teacher/assignment/remove/${assignment_id}`)
}