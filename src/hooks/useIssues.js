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
