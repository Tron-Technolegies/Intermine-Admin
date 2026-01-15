import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function useEditFarm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ farmId, farm, capacity, serviceProvider }) => {
      const res = await api.patch("/api/v1/mining-farms", {
        farmId,
        farm,
        capacity,
        serviceProvider,
      });
      return res.data;
    },

    onSuccess: () => {
      console.log("Farm updated successfully!");
      queryClient.invalidateQueries(["miningFarms"]); // refresh farms list
      toast.success("Farm updated successfully");
    },

    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong"
      );
    },
  });
}
