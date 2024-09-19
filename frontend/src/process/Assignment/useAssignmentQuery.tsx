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
import { SuccessToast } from "../../components/Toast/SuccessToast";
import { FailedToast } from "../../components/Toast/FailedToast";
import { useNavigate } from "react-router-dom";

export const useAssignmentQuery = (class_id: string) => {

    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['assignment', class_id],
        queryFn: () => fetchAssignmentService(class_id),
        // staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })
   
    const isEmpty = isSuccess && (!data || data.length === 0);
        
    return {data, isSuccess, isError, error, isLoading, isEmpty}
 
};


export const useAssignedStudentsWorkQuery = (assignment_id:string) => {
    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryKey: ['assignedStudents', assignment_id],
        queryFn: () => fetchAssignmentService(assignment_id),
        staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
    })
   
    const isEmpty = isSuccess && (!data || data.length === 0);
    
    return {data, isSuccess, isError, error, isLoading, isEmpty}
}

export const useAddAssignment = () => {
    const { createAssignment } = useAssignmentStore()
    const { startLoading, stopLoading} = useModalStore()
    const navigate = useNavigate() 
   
    return useMutation({
        mutationFn: async (data: AssignmentType) => {
            startLoading()
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
            FailedToast("Create assignment failed!")
            stopLoading()
        },
        onSuccess: (data, variables, context) => {           
            createAssignment(data[0])
            SuccessToast("Assignment created successfully!")
            console.log("Classroom successfully added:", data);
            stopLoading()           
            navigate(-1)
        }
    });
}

export const useEditAssignment = () => {

    const { editAssignment } = useAssignmentStore()
    const { startLoading, stopLoading } = useModalStore()
    const navigate = useNavigate() 

    return useMutation({
        mutationFn: async (data : AssignmentType) => {
            startLoading()
            const response = await editAssignmentService(data)
            
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
            FailedToast("Edit assignment failed!")
            stopLoading()
        },
        onSuccess: async (data, variables, context) => { 
            
            editAssignment(variables)
            SuccessToast("Assignment edited successfully!")
            console.log("Classroom successfully edited:", variables);
            stopLoading()
            navigate(-1)
        }
    });
    
}

export const useDeleteAssignment = () => {
    const { removeAssignment } = useAssignmentStore()
    const { startLoading, stopLoading } = useModalStore()
  
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
            FailedToast("Delete assignment failed!")
            stopLoading()
        },
        onSuccess: async (data, variables, context) => { 
            
            removeAssignment(variables)
            SuccessToast("Assignment deleted successfully!")
            console.log("Classroom successfully added:", data);
            stopLoading()            
        }
    });

}
