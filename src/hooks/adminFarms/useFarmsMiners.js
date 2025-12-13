import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useFarmMiners(location, page = 1, search = "") {
  return useQuery({
    queryKey: ["farmMiners", location, page, search],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/miner/farms", {
        params: {
          currentPage: page,
          location: location || "ALL",
          query: search,
        },
      });

      return res.data;
    },
    // enabled: !!location,
    refetchOnWindowFocus: false,
  });
}
