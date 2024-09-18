import { useQuery, useMutation } from "@tanstack/react-query";
import { 
    fetchAssignmentService, 
    createAssignmentService, 
    getAssignStudentsWorkService,
    editAssignmentService, 
    deleteAssignmentService } from "./assignmentService";
import { AssignmentType } from "./assignmentType";
import useAssignmentStore from "./useAssignmentStore";
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

export const useAddAssignment = () => {
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
            createAssignment(data[0])            
            console.log("Classroom successfully added:", data);
        }
    });
}

export const useEditAssignment = (data : AssignmentType) => {
    
}

export const useDeleteAssignment = () => {
    const { removeAssignment } = useAssignmentStore()
    const { showErrorAlert, startLoading, stopLoading, showSuccessAlert } = useModalStore()
  
    return useMutation({
        mutationFn: async (assignment_id : string) => {
            startLoading()
            const response = await deleteAssignmentService(assignment_id)
            
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
            stopLoading()
        },
        onSuccess: async (data, variables, context) => { 
            
            await removeAssignment(variables)            
            console.log("Classroom successfully added:", data);
            stopLoading()
            showSuccessAlert()
        }
    });

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