import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useIssues(selectedType, searchTerm, currentPage) {
  return useQuery({
    queryKey: ["issues", selectedType, searchTerm, currentPage],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/issue", {
        params: {
          currentPage: currentPage || 1,
          status: selectedType === "All" ? "ALL" : selectedType,
          query: searchTerm || "",
        },
      });
      return res.data;
    },
  });
}

export const useGetSingleIssue = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["single-issue", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/issue/${id}`);
      return data;
    },
  });
  return { data, isError, isLoading };
};

export const useGetClientMiners = ({ clientId }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["client-miners", clientId],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/admin/issue/client-miners", {
        params: { clientId },
      });
      return data;
    },
  });
  return { isLoading, isError, data };
};
