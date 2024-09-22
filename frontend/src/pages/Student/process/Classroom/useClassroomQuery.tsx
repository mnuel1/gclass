import { useQuery, useMutation } from "@tanstack/react-query";
import { 
    fetchClassroomsService, 
    joinClassroomService  } from "./classroomService";

import useClassroomStore from "./useClassroomStore";
import { ClassroomTypes } from "./classroomTypes";
import { SuccessToast } from "../../../../components/Toast/SuccessToast";
import { FailedToast } from "../../../../components/Toast/FailedToast";
import { Authentication } from "../../../../Auth/Authentication";
import useModalStore from "../../../../process/Modal/useModalStore";

export const useClassroomQuery = () => {
    const { getID } = Authentication();
    const student_id = getID();
    const { data, isSuccess, isError, error, isLoading } = useQuery({
        queryKey: ['classrooms', student_id],
        queryFn: () => fetchClassroomsService(student_id),        
        // staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes        
    });

    const isEmpty = isSuccess && (!data || data.length === 0);

    return { data, isSuccess, isError, error, isLoading, isEmpty };
};

export const useJoinClassroom = () => {
    const { addClassroom } = useClassroomStore()
    const { startLoading, stopLoading} = useModalStore()
    return useMutation({
        mutationFn: async (data: ClassroomTypes) => {
            startLoading()
            console.log(data);
            
            const response = await joinClassroomService(data)
            
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
            FailedToast("Join class failed")
            stopLoading()
        },
        onSuccess: (data, variables, context) => {           
            addClassroom(data)
            
            SuccessToast("Join class successfully!")
            console.log("class successfully added:", data);
            stopLoading()
        }   
    });
};

export const useRemoveClassroom = () => {
    const { deleteClassroom } = useClassroomStore()
    const { startLoading, stopLoading} = useModalStore()  
    return useMutation({
        mutationFn: async (class_id: string) => {
            startLoading()
            // const response = await joinClassroomService(class_id)
            // if (response.status !== 200) {
            //     throw new Error('Server error occurred')
            // }           
        },
        onMutate: (variables) => {         
            
            return { id: 1 }; 
        },
        onError: (error, variables, context) => {
            
            console.log(`Error occurred, rolling back optimistic update with id ${error}`);
            FailedToast("Remove class failed")
            stopLoading()
        },
        onSuccess: (data, variables, context) => {
            
            deleteClassroom(variables)
            SuccessToast("Class removed successfully!") 
            console.log("Classroom successfully deleted:", variables);
            stopLoading()
        }
    });

}