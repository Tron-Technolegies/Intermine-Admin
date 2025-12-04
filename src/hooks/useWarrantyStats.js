import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useWarrantyStats() {
  return useQuery({
    queryKey: ["warrantyStats"],
    queryFn: async () => {
      const res = await api.get("/api/v1/warranty/stats");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}
