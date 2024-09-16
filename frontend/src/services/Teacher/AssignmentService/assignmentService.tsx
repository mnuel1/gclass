
import api from "../../../api/axios";

export const fetchAssignment = async (class_id : string) => {
    const response = await api.get(`teacher/assignment/${class_id}`); 
    
    return response.data.data;
}