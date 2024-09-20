
import { api } from "../axios";
import { Event } from "./calendarType";
export const fetchMeetingService = async (class_id : string) => {
    const response = await api.get(`teacher/meeting/${class_id}`); 
    
    return response.data.data;
}

export const createMeetingService = async (data: Event) => {
    return await api.post(`teacher/meeting`, data)
}

export const editMeetingService = async (start_date : string) => {
    return await api.post(`teacher/meeting/edit`, start_date)
}

export const deleteMeetingService = async (class_meeting_id: string) => {
    return await api.post(`teacher/meeting/remove/${class_meeting_id}`)
}