import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useDeleteMiner = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (minerId) => {
      await api.delete(`/api/v1/admin/miner/delete/${minerId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miners"] });
      queryClient.invalidateQueries({ queryKey: ["single-miner"] });
      navigate("/miners");
      toast.success("Miner deleted successfully");
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
