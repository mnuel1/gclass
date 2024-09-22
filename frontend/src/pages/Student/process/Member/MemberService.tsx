
import { api } from "../axios";

export const fetchMembers = async (class_id : string) => {
    const response = await api.get(`student/member/${class_id}`); 
    
    return response.data.data;
}

