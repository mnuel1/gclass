
import api from "../../../api/axios";


export const fetchClassrooms = async (teacher_id : string) => {
    const response = await api.get(`teacher/class/${teacher_id}`); 
    
    return response.data.data;
}