import { useQuery, useMutation } from "@tanstack/react-query";
import { 
    fetchAssignmentService, 
    createAssignmentService, 
    editAssignmentService, 
    deleteAssignmentService } from "./calendarService";
import { AssignmentType } from "./calendarType";
import useAssignmentStore from "./useCalendarStore";
import useModalStore from "../Modal/useModalStore";

export const useAssignmentQuery = (class_id: string) => {

    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['assignment', class_id],
        queryFn: () => fetchAssignmentService(class_id),
        staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })
    const isEmpty = isSuccess && (!data || data.length === 0);
    
    return {data, isSuccess, isError, error, isLoading, isEmpty}
 
};

export const useAddAssignment = (data : AssignmentType) => {
    const { createAssignment } = useAssignmentStore()
    const { showErrorAlert } = useModalStore()

    return useMutation({
        mutationFn: async (data: AssignmentType) => {
            const response = await createAssignmentService(data)
            
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
            showErrorAlert()
        },
        onSuccess: (data, variables, context) => {           
            createAssignment(data)
                        
            console.log("Classroom successfully added:", data);
        }
    });
}

export const useEditAssignment = (data : AssignmentType) => {
    
}

export const useDeleteAssignment = (data : AssignmentType) => {
    
}

// export const useAddClassroom = () => {
//     const { addClassroom } = useClassroomStore()
//     const { showErrorAlert } = useModalStore()
//     return useMutation({
//         mutationFn: async (data: ClassroomTypes) => {
//             const response = await addClassroomService(data)
            
//             if (response.status !== 200) {
//                 throw new Error('Server error occurred')
//             }   
            
//             return response.data.data;
//         },
//         onMutate: (variables) => {                    
//             return { id: 1 };
//         },
//         onError: (error, variables, context) => {           
//             console.log(`Error occurred, rolling back optimistic update with id ${error}`);
//             showErrorAlert()
//         },
//         onSuccess: (data, variables, context) => {           
//             addClassroom(data)
            
            
//             console.log("Classroom successfully added:", data);
//         }
//     });
// };