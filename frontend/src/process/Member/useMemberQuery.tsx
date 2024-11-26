// @ts-nocheck

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMembers,
  addMemberService,
  removeMemberService,
} from "./MemberService";
import { useNavigate } from "react-router-dom";
import { FailedToast } from "../../components/Toast/FailedToast";
import { SuccessToast } from "../../components/Toast/SuccessToast";
import useModalStore from "../Modal/useModalStore";

export const useMemberQuery = (class_id: string) => {
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["member", class_id],
    queryFn: () => fetchMembers(class_id),
    // staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
  });

  return { data, isSuccess, isError, error, isLoading };
};

export const useAddMember = () => {
  const { startLoading, stopLoading } = useModalStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: any) => {
      startLoading();
      const response = await addMemberService(data);

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
      FailedToast("Add members failed");
      stopLoading();
    },
    onSuccess: (data, variables, context) => {
      SuccessToast("Members added successfully!");
      stopLoading();
      navigate(-1);
    },
  });
};

export const useRemoveMember = () => {
  const { startLoading, stopLoading } = useModalStore();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      startLoading();
      const response = await removeMemberService(data);

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
      FailedToast("Remove members failed");
      stopLoading();
    },
    onSuccess: (data, variables, context) => {
      SuccessToast("Members removed successfully!");
      stopLoading();
      navigate(-1);
    },
  });
};
