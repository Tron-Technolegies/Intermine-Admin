import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export const useBulkMoveFarm = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/api/v1/mining-farms/bulk-move`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      queryClient.invalidateQueries({ queryKey: ["farm-miners"] });
      queryClient.invalidateQueries({ queryKey: ["miners"] });
      toast.success("Bulk Move success");
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
