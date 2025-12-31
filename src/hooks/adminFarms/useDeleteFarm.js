import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export const useDeleteFarm = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteFarm } = useMutation({
    mutationFn: async ({ id }) => {
      await api.delete(`/api/v1/mining-farms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      toast.success("Deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          error.message
      );
    },
  });
  return { isPending, deleteFarm };
};
