import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function AddClientModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    clientId: "",
    email: "",
    password: "",
    address: "",
    isAgreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const createClientMutation = useMutation({
    mutationFn: async () => api.post("/api/v1/auth/register", formData),

    onSuccess: () => {
      toast.success("Client registered successfully");
      setTimeout(() => onClose(), 700);
    },

    onError: (err) => {
      toast.error(err.response?.data?.error || "Registration failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.address ||
      !formData.clientId
    ) {
      return toast.error("Please fill all required fields");
    }

    createClientMutation.mutate();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl p-6 w-[420px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <IoClose size={22} />
        </button>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Add New Client</h2>
        <p className="text-sm text-gray-500 mb-5">Create a new client account.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-700">Client Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Client ID</label>
            <input
              type="text"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="isAgreement"
              checked={formData.isAgreement}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <label className="text-sm text-gray-700">Include Mining Agreement</label>
          </div>

          <button
            type="submit"
            disabled={createClientMutation.isPending}
            className="bg-[#1C2340] hover:bg-[#141A32] text-white mt-4 py-2 rounded-md"
          >
            {createClientMutation.isPending ? "Creating..." : "Add Client"}
          </button>
        </form>
      </div>
    </div>
  );
}
