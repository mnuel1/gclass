import { useQuery } from "@tanstack/react-query";
import { fetchAssignment } from "../services/Teacher/AssignmentService/assignmentService";

export const useAssignmentQuery = (class_id: string) => {

    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['assignment', class_id],
        queryFn: () => fetchAssignment(class_id),
        staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })


    return {data, isSuccess, isError, error, isLoading}
 
};