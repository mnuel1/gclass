
import { api } from "../axios";
import { Member } from "./memberType";

export const fetchMembers = async (class_id : string) => {
    const response = await api.get(`teacher/member/${class_id}`); 
    
    return response.data.data;
}


export const fetchAssignedMembers = async (class_id : string) => {
    const response = await api.get(`teacher/member/${class_id}`); 
    
    return response.data.data;
}

export const addMemberService = async (member: Member) => {
    return await api.post(`teacher/member`, member)
}

export const removeMemberService = async (member: any) => {
    return await api.post(`teacher/member/remove`, member)
}