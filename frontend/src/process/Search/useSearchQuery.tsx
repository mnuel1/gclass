// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "./activityService";

export const useActivityQuery = (class_id: string) => {
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["activity", class_id],
    queryFn: () => fetchActivity(class_id),
    staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
  });
  const isEmpty = isSuccess && (!data || data.length === 0);

  return { data, isSuccess, isError, error, isLoading, isEmpty };
};
