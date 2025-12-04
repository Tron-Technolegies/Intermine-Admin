import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useIssueMessages(issueId, enabled = false) {
  return useQuery({
    queryKey: ["issueMessages", issueId],
    queryFn: async () => {
      const res = await api.get(`/api/v1/admin/issue/issue-messages/${issueId}`);
      return res.data;
    },
    enabled,
  });
}
