import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchAssignmentService,
  fetchStudentGradeService,
  createAssignmentService,
  editAssignmentService,
} from "./assignmentService";
import { AssignmentType } from "./assignmentType";
import useAssignmentStore from "./useAssignmentStore";
import useModalStore from "../../../../process/Modal/useModalStore";
import { SuccessToast } from "../../../../components/Toast/SuccessToast";
import { FailedToast } from "../../../../components/Toast/FailedToast";
import { useNavigate } from "react-router-dom";

export const useAssignmentQuery = (class_id: string, student_id: string) => {
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["assignment", class_id, student_id],
    queryFn: () => fetchAssignmentService(class_id, student_id),
    // staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
  });

  const isEmpty = isSuccess && (!data || data.length === 0);

  return { data, isSuccess, isError, error, isLoading, isEmpty };
};

export const useGetStudentGradeQuery = (
  class_id: string,
  student_id: string
) => {
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["assignment", class_id, student_id],
    queryFn: () => fetchStudentGradeService(class_id, student_id),
    // staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
  });

  const isEmpty = isSuccess && (!data || data.length === 0);

  return { data, isSuccess, isError, error, isLoading, isEmpty };
};

export const useAddAssignment = () => {
  const { createAssignment } = useAssignmentStore();
  const { startLoading, stopLoading } = useModalStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: AssignmentType) => {
      startLoading();
      const response = await createAssignmentService(data);

      if (response.status !== 200) {
        throw new Error("Server error occurred");
      }
      return response.data.data;
    },
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      console.log(
        `Error occurred, rolling back optimistic update with id ${error}`
      );
      FailedToast("Assignment Submit failed!");
      stopLoading();
    },
    onSuccess: (data, variables, context) => {
      createAssignment(data[0]);
      SuccessToast("Assignment Submitted successfully!");
      console.log("Classroom successfully added:", data);
      stopLoading();
      navigate(-1);
    },
  });
};

export const useEditAssignment = () => {
  const { editAssignment } = useAssignmentStore();
  const { startLoading, stopLoading } = useModalStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: AssignmentType) => {
      startLoading();
      const response = await editAssignmentService(data);

      if (response.status !== 200) {
        throw new Error("Server error occurred");
      }
      return response.data.data;
    },
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      console.log(
        `Error occurred, rolling back optimistic update with id ${error}`
      );
      FailedToast("Edit assignment failed!");
      stopLoading();
    },
    onSuccess: async (data, variables, context) => {
      editAssignment(variables);
      SuccessToast("Assignment edited successfully!");
      console.log("Classroom successfully edited:", variables);
      stopLoading();
      navigate(-1);
    },
  });
};
