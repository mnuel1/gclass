
import api from "../../../api/axios";
import { ClassroomTypes } from "../../../types/classroomTypes";

export const fetchClassroomsService = async (teacher_id : string) => {
    const response = await api.get(`teacher/class/${teacher_id}`); 
    
    return response.data.data;
}


export const addClassroomService = async (data: ClassroomTypes) => {
    const response = await api.post(`teacher/class`, data); 
        
    return response.data.data;
}

export const editClassroomService = async (data : any) => {
    const response = await api.post(`teacher/class/edit`, data); 
    
    return response.data.data;
}

export const removeClassroomService = async (class_id : string) => {
    const response = await api.post(`teacher/class/remove/${class_id}`); 
    
    return response.data.data;
}