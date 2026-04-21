import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export const useGetRepairMiners = ({ currentPage, query, status }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["warranty-repair", currentPage, query, status],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/miner/warranty-repair`, {
        params: { currentPage, query, status },
      });
      return data;
    },
  });
  return { isLoading, isError, error, data };
};
