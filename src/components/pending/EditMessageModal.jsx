import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { editPendingMessage } from "../../hooks/useMessageActions";
import { toast } from "react-toastify";

export default function EditMessageModal({ record, onClose }) {
  const [message, setMessage] = useState(record.message);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setSaving(true);
    try {
      await editPendingMessage(record, message);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="bg-[#F7F8F9] rounded-2xl max-w-lg w-full p-6 relative shadow-xl">
        <IoMdClose
          className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl"
          onClick={onClose}
        />

        <h2 className="text-2xl font-bold mb-2">Edit Message</h2>
        <p className="text-gray-500 mb-6">Update the message before releasing it.</p>

        <label className="text-sm font-medium">Client</label>
        <input
          className="w-full bg-white border border-[#787878] p-2 rounded mb-4"
          value={record.clientName}
          readOnly
        />

        <label className="text-sm font-medium">Miner</label>
        <input
          className="w-full bg-white border border-[#787878] p-2 rounded mb-4"
          value={record.miner}
          readOnly
        />

        <label className="text-sm font-medium">Subject</label>
        <input
          className="w-full bg-white border border-[#787878] p-2 rounded mb-4"
          value={record.issueType}
          readOnly
        />

        <label className="text-sm font-medium">Message Content</label>
        <textarea
          className="w-full bg-white border border-[#787878] rounded p-3 h-28 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5 text-sm">
          <button className="border px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>

          <button
            disabled={saving}
            className={`px-5 py-2 rounded text-white ${saving ? "bg-gray-400" : "bg-[#1C2657]"}`}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
