import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export default function useAddFarm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ farm, capacity }) => {
      return api.post("/api/v1/mining-farms", {
        farm,
        capacity,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["farms"]);
    },
  });
}
