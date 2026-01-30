import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export const useGetSingleMiner = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["single-miner", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/miner/${id}`);
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useGetMinerModels = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["miner-models"],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/miner/model`);
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useAddMinerModel = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/api/v1/admin/miner/model`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miner-models"] });
      toast.success("New miner model added successfully");
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
