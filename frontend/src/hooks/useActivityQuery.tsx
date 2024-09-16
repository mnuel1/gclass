import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "../services/Teacher/ActivityService/activityService";

export const useActivityQuery = (class_id: string) => {

    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['activity', class_id],
        queryFn: () => fetchActivity(class_id),
        staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })


    return {data, isSuccess, isError, error, isLoading}
 
};