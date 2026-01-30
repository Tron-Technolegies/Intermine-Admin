import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function useAddFarm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return api.post("/api/v1/mining-farms", data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["farms"]);
      toast.success("Farm Added successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
}
