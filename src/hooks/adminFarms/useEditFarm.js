import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function useEditFarm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.patch("/api/v1/mining-farms", data);
      return res.data;
    },

    onSuccess: () => {
      console.log("Farm updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["farms"] }); // refresh farms list
      queryClient.invalidateQueries({ queryKey: ["farm-miners"] });
      toast.success("Farm updated successfully");
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
