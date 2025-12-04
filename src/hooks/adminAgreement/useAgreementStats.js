import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useAgreementStats() {
  return useQuery({
    queryKey: ["agreement-stats"],
    queryFn: async () => {
      const res = await api.get("/api/v1/agreement/stats");
      return res.data;
    },
  });
}
