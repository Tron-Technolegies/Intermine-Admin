import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { toast } from "react-toastify";

export const useReportIssue = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ data }) => {
      await api.post("/api/v1/admin/issue", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["miners"] });
      queryClient.invalidateQueries({ queryKey: ["single-miner"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-miners"] });
      toast.success("Issue Added");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
  return { isPending, mutate };
};
