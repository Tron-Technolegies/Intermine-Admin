import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useClients(page = 1, query = "", status = "ALL") {
  return useQuery({
    queryKey: ["clients", page, query, status],
    queryFn: async () => {
      const res = await api.get(
        `/api/v1/admin/user/all?currentPage=${page}&query=${query}&status=${status}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}
