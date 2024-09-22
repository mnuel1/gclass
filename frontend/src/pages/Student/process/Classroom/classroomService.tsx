
import { api } from "../axios";
import { ClassroomTypes } from "./classroomTypes";

export const fetchClassroomsService = async (student_id : string) => {
    const respose = await api.get(`student/class/${student_id}`);     
    return respose.data.data   
}


export const joinClassroomService = async (data : ClassroomTypes) => {
    return await api.post(`student/join/class`, data);     
 
}