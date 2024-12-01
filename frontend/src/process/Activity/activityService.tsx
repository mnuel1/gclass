
import { api } from "../axios";



export const fetchPost = async (class_id : string) => {
    const response = await api.get(`class/${class_id}/posts`);     
    return response.data.posts;
}

export const fetchActivity = async (class_id : string) => {
    const response = await api.get(`teacher/class/${class_id}/activity`);     
    return response.data.data;
}

export const addMeetingService = async (data: any) => {
    return await api.post("teacher/class/activity", data)
}