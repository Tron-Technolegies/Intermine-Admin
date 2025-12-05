import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useAdminNotifications(page, search, status = "ALL") {
  return useQuery({
    queryKey: ["adminNotifications", page, search, status],
    queryFn: async () => {
      const res = await api.get("/api/v1/notification/admin", {
        params: {
          currentPage: page,
          query: search,
          status,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
}
