import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useFarms() {
  return useQuery({
    queryKey: ["farms"],
    queryFn: async () => {
      const res = await api.get("/api/v1/mining-farms");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}
