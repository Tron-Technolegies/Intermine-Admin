import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { toast } from "react-toastify";

export default function useClients(page = 1, query = "", status = "ALL") {
  return useQuery({
    queryKey: ["clients", page, query, status],
    queryFn: async () => {
      const res = await api.get(
        `/api/v1/admin/user/all?currentPage=${page}&query=${query}&status=${status}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export const useEditClient = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ data }) => {
      await api.patch("/api/v1/admin/user", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["clientDetails"] });
      toast.success("client updated successfully");
    },
    onError: (error) => {
      console.log(error);

      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong"
      );
    },
  });
  return { isPending, mutate };
};
