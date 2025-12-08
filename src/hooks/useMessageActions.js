import { toast } from "react-toastify";
import api from "../api/api";
export const editPendingMessage = async (record, message) => {
  try {
    const payload = {
      id: record._id,
      serviceProviderId: record.serviceProviderId,
      message: message,
    };

    const res = await api.patch("/api/v1/messages/pending/edit", payload, {
      withCredentials: true,
    });

    toast.success("Message updated!");
    return res.data;
  } catch (error) {
    const msg = error?.response?.data?.error || "Error editing message.";
    toast.error(msg);
    throw error;
  }
};

export const releasePendingMessage = async (record) => {
  try {
    const payload = {
      id: record._id,
      serviceProviderId: record.serviceProviderId,
      message: record.message,
    };

    const res = await api.patch("/api/v1/messages/pending/release", payload, {
      withCredentials: true,
    });

    toast.success("Message released!");
    return res.data;
  } catch (error) {
    const msg = error?.response?.data?.error || "Error releasing message.";
    toast.error(msg);
    throw error;
  }
};

export const cancelPendingMessage = async (record) => {
  try {
    const payload = {
      id: record._id,
      serviceProviderId: record.serviceProviderId,
      message: record.message,
    };

    const res = await api.patch("/api/v1/messages/pending/cancel", payload, {
      withCredentials: true,
    });

    toast.success("Message cancelled!");
    return res.data;
  } catch (error) {
    const msg = error?.response?.data?.error || "Error cancelling message.";
    toast.error(msg);
    throw error;
  }
};
