// hooks/useIssueActions.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { toast } from "react-toastify";

export default function useIssueActions() {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: ({ id, status, serviceProvider, location }) =>
      api.patch(`/api/v1/admin/issue/update-status/${id}`, {
        status,
        serviceProvider,
        location,
        notifyTechnician,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      queryClient.invalidateQueries({ queryKey: ["miners"] });
      toast.success("Issue Status updated");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error || error.response.data.message || "something went wrong",
      );
    },
  });

  const sendResponse = useMutation({
    mutationFn: ({ issueId, message }) =>
      api.patch("/api/v1/admin/issue/send-response", { issueId, message }),
    onSuccess: () => {
      queryClient.invalidateQueries(["issueMessages"]);
      toast.success("Response send successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error || error.response.data.message || "something went wrong",
      );
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
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      toast.success("Successfully reminded");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error || error.response.data.message || "something went wrong",
      );
    },
  });
  const notifyTechnician = useMutation({
    mutationFn: ({ issueId, email, notes }) =>
      api.post(`/api/v1/admin/issue/${issueId}/notify-technician`, {
        email,
        notes,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      toast.success("Technician notified successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || error.response?.data?.message || "Something went wrong",
      );
    },
  });

  return {
    updateStatus,
    sendResponse,
    sendReminder,
  };
}
