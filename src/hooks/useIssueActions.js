// hooks/useIssueActions.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export default function useIssueActions() {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) =>
      api.patch(`/api/v1/admin/issue/update-status/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
    },
  });

  const sendResponse = useMutation({
    mutationFn: ({ issueId, message }) =>
      api.patch("/api/v1/admin/issue/send-response", { issueId, message }),
    onSuccess: () => {
      queryClient.invalidateQueries(["issueMessages"]);
    },
  });

  const sendReminder = useMutation({
    mutationFn: ({ issueId, issue, model, serialNumber, serviceProvider }) =>
      api.patch("/api/v1/admin/issue/dahab-reminder", {
        issue,
        model,
        issueId,
        serviceProvider,
        serialNumber,
      }),
  });

  return {
    updateStatus,
    sendResponse,
    sendReminder,
  };
}
