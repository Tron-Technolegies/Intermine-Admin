import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useAgreements(page = 1, query = "", status = "ALL") {
  return useQuery({
    queryKey: ["agreements", page, query, status],
    queryFn: async () => {
      const res = await api.get(`/api/v1/agreement`, {
        params: {
          currentPage: page,
          query,
          status,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}

export const useDownloadPdf = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await api.get(`/api/v1/agreement/user/download/${id}`, {
        responseType: "blob",
      });
      return data;
    },
  });
  return { isPending, mutateAsync };
};
