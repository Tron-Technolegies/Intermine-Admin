import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export default function useEditFarm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ farmId, farm, capacity }) => {
      const res = await api.patch("/api/v1/mining-farms", {
        farmId,
        farm,
        capacity,
      });
      return res.data;
    },

    onSuccess: () => {
      console.log("Farm updated successfully!");
      queryClient.invalidateQueries(["miningFarms"]); // refresh farms list
    },

    onError: (err) => {
      console.error("Failed to edit farm:", err.response?.data || err.message);
    },
  });
}
