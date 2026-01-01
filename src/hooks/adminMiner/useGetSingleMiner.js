import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export const useGetSingleMiner = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["single-miner", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/miner/${id}`);
      return data;
    },
  });
  return { isError, isLoading, data };
};
