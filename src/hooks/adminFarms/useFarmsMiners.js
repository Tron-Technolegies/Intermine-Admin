import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export const useGetFarmMiners = ({ farmId }) => {
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["farm-miners", farmId],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/mining-farms/miners/${farmId}`);
      return data;
    },
  });
  return { isError, isLoading, data, error };
};
