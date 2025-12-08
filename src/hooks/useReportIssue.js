import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { toast } from "react-toastify";

export const useReportIssue = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ user, miner, issue, workerAddress, offline }) => {
      await api.post("/api/v1/admin/issue", {
        user,
        miner,
        issue,
        workerAddress,
        offline,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      toast.success("Issue Added");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });
  return { isPending, mutate };
};
