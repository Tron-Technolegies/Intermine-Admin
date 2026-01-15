import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export const useAddAnnouncement = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/api/v1/mining-farms/announcement`, data);
    },
    onSuccess: () => {
      toast.success("Announcment added succesfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong"
      );
    },
  });
  return { isPending, mutateAsync };
};
