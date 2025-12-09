import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import useUsersDropdown from "../../hooks/adminAgreement/useUsersDropdown";
import useAgreementActions from "../../hooks/adminAgreement/useAgreementActions";
import { toast } from "react-toastify";

export default function AgreementSendFormModal({ onClose }) {
  const [user, setUser] = useState("");
  const [type, setType] = useState("");

  const { data: users = [] } = useUsersDropdown();
  const { sendAgreement } = useAgreementActions();

  const handleSend = async () => {
    if (!user) {
      toast.error("Please select a client");
      return;
    }
    if (!type) {
      toast.error("Please select an agreement type");
      return;
    }

    try {
      await sendAgreement.mutateAsync({ user, type });

      toast.success("Agreement sent successfully!");
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.error || err?.message || "Failed to send agreement. Please try again.";

      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Send Mining Agreement</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <IoClose size={22} />
          </button>
        </div>

        {/* USER SELECT */}
        <div className="mb-4">
          <label className="text-sm font-medium">Client</label>
          <select
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border w-full p-2 rounded-lg mt-1"
          >
            <option value="">Select a Client</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.clientName} ({u.clientId})
              </option>
            ))}
          </select>
        </div>

        {/* AGREEMENT TYPE */}
        <div className="mb-4">
          <label className="text-sm font-medium">Agreement Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border w-full p-2 rounded-lg mt-1"
          >
            <option value="">Select Type</option>
            <option value="Purchase">Purchase</option>
            <option value="Mining">Mining</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end mt-6 gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button onClick={handleSend} className="px-5 py-2 rounded-lg bg-[#3893D0] text-white">
            {sendAgreement.isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
