
import { api } from "../axios";

export const fetchMeetingService = async (student_id : string) => {
    const response = await api.get(`student/meeting/${student_id}`); 
    
    return response.data.data;
}