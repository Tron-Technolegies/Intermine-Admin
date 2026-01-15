import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { toast } from "react-toastify";

export const useAddInternalNote = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ user, note }) => {
      await api.patch(
        `api/v1/admin/user/add-note`,
        { user, note },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientDetails"] });
      toast.success("Note added successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong"
      );
    },
  });
  return { isPending, mutate };
};

export const useClearNotes = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ user }) => {
      await api.patch(`/api/v1/admin/user/clear-note`, { user });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientDetails"] });
      toast.success("Notes cleared");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong"
      );
    },
  });
  return { isPending, mutate };
};
