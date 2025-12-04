import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useUsersDropdown() {
  return useQuery({
    queryKey: ["agreement-users"],
    queryFn: async () => {
      const res = await api.get("/api/v1/dropdown/users");
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}
