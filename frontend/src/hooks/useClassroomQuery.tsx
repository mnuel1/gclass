import { useQuery, useMutation } from "@tanstack/react-query";
import { 
    fetchClassroomsService, 
    addClassroomService, 
    editClassroomService, 
    removeClassroomService  } from "../services/Teacher/ClassroomService/classroomService";

import useClassroomStore from "../store/Teacher/Classroom/useClassroomStore";
import { ClassroomTypes } from "../types/classroomTypes";


export const useClassroomQuery = (teacher_id: string) => {
    const { data, isSuccess, isError, error, isLoading } = useQuery({
        queryKey: ['classrooms', teacher_id],
        queryFn: () => fetchClassroomsService(teacher_id),        
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes        
    });

    return { data, isSuccess, isError, error, isLoading };
};

export const useAddClassroom = () => {
    const { addClassroom } = useClassroomStore()
    return useMutation({
        mutationFn: (data: ClassroomTypes) => addClassroomService(data),
        onMutate: (variables) => {         
            // Optimistic update or any action before the mutation
            return { id: 1 }; // Context for rollback if needed
        },
        onError: (error, variables, context) => {
            // Handle error
            console.log(`Error occurred, rolling back optimistic update with id ${error}`);
        },
        onSuccess: (data, variables, context) => {
            // Handle success
            addClassroom(data)
            
            
            console.log("Classroom successfully added:", data);
        }
    });
};

export const useEditClassroom = (data :any) => {

    const { deleteClassroom } = useClassroomStore()
    return useMutation({
        mutationFn: (class_id: string) => editClassroomService(class_id),
        onMutate: (variables) => {         
            // Optimistic update or any action before the mutation
            return { id: 1 }; // Context for rollback if needed
        },
        onError: (error, variables, context) => {
            // Handle error
            console.log(`Error occurred, rolling back optimistic update with id ${error}`);
        },
        onSuccess: (data, variables, context) => {
            // Handle success
            editClassroom(variables)
            
            
            console.log("Classroom successfully added:", variables);
        }
    });

  
}

export const useRemoveClassroom = () => {
    const { deleteClassroom } = useClassroomStore()
    return useMutation({
        mutationFn: (class_id: string) => removeClassroomService(class_id),
        onMutate: (variables) => {         
            // Optimistic update or any action before the mutation
            return { id: 1 }; // Context for rollback if needed
        },
        onError: (error, variables, context) => {
            // Handle error
            console.log(`Error occurred, rolling back optimistic update with id ${error}`);
        },
        onSuccess: (data, variables, context) => {
            // Handle success
            deleteClassroom(variables)
            
            
            console.log("Classroom successfully added:", variables);
        }
    });

}