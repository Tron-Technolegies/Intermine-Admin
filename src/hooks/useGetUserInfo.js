import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export const useGetUserInfo = () => {
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/user/info");
      return data;
    },

    retry: false,
  });
  return { isLoading, data, error, isSuccess };
};
