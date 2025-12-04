import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useFarmMiners(location, page = 1, search = "", status = "") {
  return useQuery({
    queryKey: ["farmMiners", location, page, search, status],
    queryFn: async () => {
      if (!location) return { miners: [], totalPages: 1 };

      const res = await api.get("/api/v1/admin/miner/farms", {
        params: {
          currentPage: page,
          location,
          query: search,
          status: status || "ALL",
        },
      });

      return res.data;
    },
    enabled: !!location,
    refetchOnWindowFocus: false,
  });
}
