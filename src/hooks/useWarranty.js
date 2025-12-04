import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useWarranty(page, type, query) {
  return useQuery({
    queryKey: ["warranty", page, type, query],

    queryFn: async () => {
      const res = await api.get("/api/v1/warranty", {
        params: {
          currentPage: page,
          type: type,
          query: query,
        },
      });
      return res.data;
    },

    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}
