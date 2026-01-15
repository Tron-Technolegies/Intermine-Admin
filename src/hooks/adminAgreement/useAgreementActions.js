import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function useAgreementActions() {
  const queryClient = useQueryClient();

  const sendAgreement = useMutation({
    mutationFn: async (payload) => api.post("/api/v1/agreement/send", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["agreements"]);
      queryClient.invalidateQueries({ queryKey: ["agreement-stats"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Mining Agreement sent Successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong"
      );
    },
  });

  return {
    sendAgreement,
  };
}
