
import { api } from "../axios";
import { ClassroomTypes } from "./classroomTypes";

export const fetchClassroomsService = async (teacher_id : string) => {
    const respose = await api.get(`teacher/class/${teacher_id}`);     
    return respose.data.data   
}


export const addClassroomService = async (data: ClassroomTypes) => {
    return await api.post(`teacher/class`, data);             
}

export const editClassroomService = async (data : any) => {   
    return await api.post(`teacher/class/edit`, data);                 
}

export const removeClassroomService = async (class_id : string) => {
    return await api.post(`teacher/class/remove/${class_id}`);        
}