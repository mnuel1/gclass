
import api from "../../../api/axios";


export const fetchMembers = async (class_id : string) => {
    const response = await api.get(`teacher/member/${class_id}`); 
    
    return response.data.data;
}