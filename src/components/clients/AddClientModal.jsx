import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function AddClientModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
    address: "",
    agreement: "",
    sendAgreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New client:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-2xl p-6 w-[420px] shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">Add New Client</h2>
        <p className="text-sm text-gray-500 mb-5">
          Create a new Client account with a unique identifier.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {["name", "id", "email", "password", "address", "agreement"].map((field) => (
            <div key={field}>
              <label className="text-sm text-gray-700 capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="sendAgreement"
              checked={formData.sendAgreement}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <label className="text-sm text-gray-700">Send mining agreement</label>
          </div>

          <button
            type="submit"
            className="bg-[#1C2340] hover:bg-[#141A32] text-white mt-4 py-2 rounded-md"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
}
