import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function useNotificationActions() {
  const queryClient = useQueryClient();

  const markAll = useMutation({
    mutationFn: async () => api.patch("/api/v1/notification/admin/all"),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminNotifications"]);
      queryClient.invalidateQueries({ queryKey: ["unread-notifications"] });
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });

  const clearSingle = useMutation({
    mutationFn: async (id) => api.patch(`/api/v1/notification/user/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminNotifications"]);
      queryClient.invalidateQueries({ queryKey: ["unread-notifications"] });
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });

  return { markAll, clearSingle };
}
