import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function EditMessageModal({ record, onClose }) {
  const [form, setForm] = useState({
    client: record.client,
    miner: record.miner,
    subject: record.subject,
    message:
      "Your miner has gone offline due to network connectivity issues. Our team is investigating.",
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-xl">
        <IoMdClose
          className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl"
          onClick={onClose}
        />

        <h2 className="text-2xl font-bold mb-2">Edit Message</h2>
        <p className="text-gray-500 mb-6">
          Edit the message before releasing it to {record.client}. Changes will be reviewed before
          sending.
        </p>

        <label className="text-sm font-medium">Client</label>
        <input className="w-full bg-gray-100 p-2 rounded mb-4" value={form.client} readOnly />

        <label className="text-sm font-medium">Miner</label>
        <input className="w-full bg-gray-100 p-2 rounded mb-4" value={form.miner} readOnly />

        <label className="text-sm font-medium">Subject</label>
        <input
          className="w-full border p-2 rounded mb-4"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <label className="text-sm font-medium">Message Content</label>
        <textarea
          className="w-full border rounded p-3 h-28 resize-none"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <div className="flex justify-end gap-3 mt-5 text-sm">
          <button className="border px-4 py-2 rounded hover:bg-gray-100" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-[#1C2657] text-white px-5 py-2 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
