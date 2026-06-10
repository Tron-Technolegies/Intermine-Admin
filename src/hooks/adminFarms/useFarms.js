import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useFarms() {
  return useQuery({
    queryKey: ["farms"],
    queryFn: async () => {
      const res = await api.get("/api/v1/mining-farms");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export const useGetFarmList = ({ currentPage, serviceProvider }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["farms-list", currentPage, serviceProvider],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/mining-farms/list`, {
        params: { currentPage, serviceProvider },
      });
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useGetNoHostingMiners = ({ search, currentPage }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["no-hosting", currentPage, search],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/mining-farms/no-hosting`, {
        params: { currentPage, search },
      });
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useGetRepairAndWarrantyFarms = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["repair-warranty-farms"],
    queryFn: async () => {
      const { data } = await api.get(
        `/api/v1/mining-farms/repair-warranty-list`,
      );
      return data;
    },
  });
  return { isLoading, isError, error, data };
};
