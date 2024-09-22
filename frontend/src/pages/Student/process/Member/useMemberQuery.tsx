import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMembers } from "./MemberService";


export const useMemberQuery = (class_id: string) => {

    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['member', class_id],
        queryFn: () => fetchMembers(class_id),
        staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })


    return {data, isSuccess, isError, error, isLoading}
 
};

