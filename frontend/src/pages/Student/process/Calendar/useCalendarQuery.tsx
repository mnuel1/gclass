import { useQuery } from "@tanstack/react-query";
import { fetchMeetingService } from "./calendarService";


export const useMeetingQuery = (student_id: string) => {

    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['meeting', student_id],
        queryFn: () => fetchMeetingService(student_id),
        staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })
    const isEmpty = isSuccess && (!data || data.length === 0);
    
    return {data, isSuccess, isError, error, isLoading, isEmpty}
 
};

