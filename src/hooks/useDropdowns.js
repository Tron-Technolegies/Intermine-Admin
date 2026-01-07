import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useGetUserDropdowns = ({ search }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["client-dropdown", search],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/dropdown/users`, {
        params: { search },
      });
      return data;
    },
  });
  return { isLoading, data };
};

export const useGetMinerDropdown = ({ search }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["miner-dropdown", search],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/dropdown/miners`, {
        params: { search },
      });
      return data;
    },
  });
  return { isLoading, data };
};
