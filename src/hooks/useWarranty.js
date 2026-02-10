import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { toast } from "react-toastify";

export default function useWarranty(page, type, query) {
  return useQuery({
    queryKey: ["warranty", page, type, query],

    queryFn: async () => {
      const res = await api.get("/api/v1/warranty", {
        params: {
          currentPage: page,
          type: type,
          query: query,
        },
      });
      return res.data;
    },

    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}

export const useGetMinersWithoutWarranty = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["miners-without-warranty"],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/warranty/warranty-less-miners`);
      return data;
    },
  });
  return { isLoading, data };
};

export const useAddWarranty = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/api/v1/warranty`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miners-without-warranty"] });
      queryClient.invalidateQueries({ queryKey: ["warranty"] });
      toast.success("New warranty added");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
