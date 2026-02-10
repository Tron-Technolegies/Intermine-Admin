import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { toast } from "react-toastify";

export const useGetServiceProviders = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["service-providers"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/provider");
      return data;
    },
  });
  return { isLoading, data, isError };
};

export const useGetSingleProvider = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["service-provider", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/provider/${id}`);
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useAddServiceProvider = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post("/api/v1/provider", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-providers"] });
      toast.success("Service provider added successfully");
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

export const useEditServiceProvider = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ data, id }) => {
      await api.patch(`/api/v1/provider/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-providers"] });
      queryClient.invalidateQueries({ queryKey: ["service-provider"] });
      toast.success("service provider updated successfully");
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
