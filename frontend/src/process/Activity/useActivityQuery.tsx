import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchActivity, addMeetingService } from "./activityService";
import useModalStore from "../Modal/useModalStore";
import { useNavigate } from "react-router-dom";
import { FailedToast } from "../../components/Toast/FailedToast";
import { SuccessToast } from "../../components/Toast/SuccessToast";
export const useActivityQuery = (class_id: string) => {

    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['activity', class_id],
        queryFn: () => fetchActivity(class_id),
        staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })
    const isEmpty = isSuccess && (!data || data.length === 0);

    return {data, isSuccess, isError, error, isLoading, isEmpty}
 
};

export const useAddMeeting = () => {
    const { startLoading, stopLoading } = useModalStore()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data: Event) => {
            startLoading()
            const response = await addMeetingService(data)
            
            if (response.status !== 200) {
                throw new Error('Server error occurred')
            }   
            
            return response.data.data;
        },
        onMutate: (variables) => {                    
            return { id: 1 };
        },
        onError: (error, variables, context) => {           
            console.log(`Error occurred, rolling back optimistic update with id ${error}`);
            FailedToast("Schedule Meeting Failed")
            stopLoading()
        },
        onSuccess: (data, variables, context) => {
            console.log("Classroom successfully added:", data);
            SuccessToast("Schedule Meeting Success!")
            stopLoading()         
        }
    });
}