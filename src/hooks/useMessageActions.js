import { toast } from "react-toastify";
import api from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllPendingMessages = ({ query, currentPage }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["pending-messages", query, currentPage],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/messages/pending`, {
        params: { query, currentPage },
      });
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useEditPendingMessage = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/api/v1/messages/pending/edit`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-messages"] });
      queryClient.invalidateQueries({ queryKey: ["pending-message"] });
      toast.success("Updated");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetSinglePendingMessage = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["pending-message", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/messages/pending/${id}`);
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useCancelPendingMessage = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/api/v1/messages/pending/cancel`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-messages"] });
      queryClient.invalidateQueries({ queryKey: ["pending-message"] });
      toast.success("Cancelled");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useReleasePendingMessage = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/api/v1/messages/pending/release`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-messages"] });
      queryClient.invalidateQueries({ queryKey: ["pending-message"] });
      toast.success("Released");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
