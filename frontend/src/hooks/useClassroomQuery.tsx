import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchClassrooms } from "../services/Teacher/ClassroomService/classroomService";

export const useClassroomQuery = (teacher_id: string) => {

    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['classrooms', teacher_id],
        queryFn: () => fetchClassrooms(teacher_id),
        staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })


    return {data, isSuccess, isError, error, isLoading}
 
};

export const useAddClassroom = (data :any) => {
    const mutation = useMutation({
        mutationFn: addClassroom,
        onSuccess: (data) => {
          addClassroom(data); // Update Zustand store
          queryClient.invalidateQueries('classrooms'); // Ensure data sync
        },
        onError: (error) => {
          console.error('Error adding classroom:', error);
        },
      });
}