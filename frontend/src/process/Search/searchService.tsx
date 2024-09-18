
import { api } from "../axios";

export const fetchActivity = async (class_id : string) => {
    const response = await api.get(`teacher/class/${class_id}/activity`); 
    
    return response.data.data;
}