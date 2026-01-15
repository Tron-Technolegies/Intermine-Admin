import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useIssueTypes() {
  const { isLoading, data } = useQuery({
    queryKey: ["issueTypes"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/issue/type");
      return res.data;
    },
  });
  return { isLoading, data };
}
