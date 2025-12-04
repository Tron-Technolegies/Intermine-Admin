import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export default function useAgreementActions() {
  const queryClient = useQueryClient();

  const sendAgreement = useMutation({
    mutationFn: async (payload) => api.post("/api/v1/agreement/send", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["agreements"]);
    },
  });

  return {
    sendAgreement,
  };
}
