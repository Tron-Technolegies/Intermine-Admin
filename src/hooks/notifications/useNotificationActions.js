import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export default function useNotificationActions() {
  const queryClient = useQueryClient();

  const markAll = useMutation({
    mutationFn: async () => api.patch("/api/v1/notification/admin/all"),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminNotifications"]);
    },
  });

  const clearSingle = useMutation({
    mutationFn: async (id) => api.patch(`/api/v1/notification/user/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminNotifications"]);
    },
  });

  return { markAll, clearSingle };
}
