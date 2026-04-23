import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export const useGetAllMinerModels = ({ search, currentPage, sortBy }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["miner-models", search, currentPage, sortBy],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/miner/model`, {
        params: { search, currentPage, sortBy },
      });
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useEditMinerModel = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ data, id }) => {
      await api.patch(`/api/v1/admin/miner/model/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miner-models"] });
      queryClient.invalidateQueries({ queryKey: ["miner-models-dropdown"] });
      queryClient.invalidateQueries({ queryKey: ["single-miner-model"] });
      toast.success("Successfully updated");
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

export const useGetSingleMinerModel = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["single-miner-model", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/miner/model/${id}`);
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useDeleteMinerModel = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/v1/admin/miner/model/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miner-models"] });
      queryClient.invalidateQueries({ queryKey: ["miner-models-dropdown"] });
      queryClient.invalidateQueries({ queryKey: ["single-miner-model"] });
      toast.success("Deleted ");
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

export const useClientsForModels = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["model-users", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/miner/model-users/${id}`);
      return data;
    },
  });
  return { isLoading, isError, data };
};
