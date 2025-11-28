import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useClientDetails(id) {
  return useQuery({
    queryKey: ["clientDetails", id],
    queryFn: async () => {
      const res = await api.get(`/api/v1/admin/user/info/${id}`);
      return res.data;
    },
  });
}
