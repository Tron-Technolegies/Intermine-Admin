import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function EditMinerModal({ minerData, onClose }) {
  // ====== Fetch Clients (Mongo IDs required) ======
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/user/all", {
        params: { query: "", currentPage: 1, status: "ALL" },
      });
      return res.data.clients;
    },
  });

  // ====== Fetch Mining Farms ======
  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await api.get("/api/v1/mining-farms", {
        params: { currentPage: 1, location: "", query: "", status: "ALL" },
      });
      return res.data;
    },
  });

  // ====== Form State ======
  const [formData, setFormData] = useState({
    client: "",
    workerId: "",
    serialNumber: "",
    model: "",
    status: "online",
    location: "",
    warranty: "",
    poolAddress: "",
    connectionDate: "",
    serviceProvider: "",
    hashRate: "",
    power: "",
    macAddress: "",
  });

  // Pre-fill data after modal opens
  useEffect(() => {
    if (minerData) {
      setFormData({
        client: minerData.client?._id || "",
        workerId: minerData.workerId || "",
        serialNumber: minerData.serialNumber || "",
        model: minerData.model || "",
        status: minerData.status || "online",
        location: "", // must select farm → backend needs farm _id, NOT name
        warranty: minerData.warranty || "",
        poolAddress: minerData.poolAddress || "",
        connectionDate: minerData.connectionDate?.split("T")[0] || "",
        serviceProvider: minerData.serviceProvider || "DAHAB",
        hashRate: minerData.hashRate || "",
        power: minerData.power || "",
        macAddress: minerData.macAddress || "",
      });
    }
  }, [minerData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ====== Update Mutation ======
  const updateMiner = useMutation({
    mutationFn: (payload) => api.patch(`/api/v1/admin/miner/${minerData._id}`, payload),
    onSuccess: () => {
      toast.success("Miner updated successfully!");
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Update failed");
      console.log("EDIT ERROR:", err.response?.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend required fields validation
    if (!formData.client) return toast.error("Client is required");
    if (!formData.location) return toast.error("Location (farm) is required");
    if (!formData.workerId) return toast.error("Worker ID is required");
    if (!formData.serialNumber) return toast.error("Serial Number is required");
    if (!formData.model) return toast.error("Model is required");
    if (!formData.power) return toast.error("Power is required");

    updateMiner.mutate({
      client: formData.client,
      workerId: formData.workerId,
      serialNumber: formData.serialNumber,
      model: formData.model,
      status: formData.status,
      location: formData.location, // MUST be farm Mongo ID
      warranty: formData.warranty,
      poolAddress: formData.poolAddress,
      connectionDate: formData.connectionDate,
      serviceProvider: formData.serviceProvider,
      hashRate: Number(formData.hashRate),
      power: Number(formData.power),
      macAddress: formData.macAddress,
    });
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") onClose();
  };

  return (
    <div
      id="overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl w-[92%] sm:w-96 max-h-[70vh] overflow-y-auto p-5 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          aria-label="Close history"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-1">Edit Miner Details</h2>
        <p className="text-gray-500 text-sm mb-4">Update existing miner.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* CLIENT */}
          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="">Select Client</option>
            {clients?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </select>

          <input
            name="workerId"
            value={formData.workerId}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Worker ID"
          />

          <input
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Serial Number"
          />

          <input
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Model"
          />

          {/* STATUS */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {/* LOCATION */}
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="">Select Mining Farm</option>
            {locations?.map((l) => (
              <option key={l._id} value={l._id}>
                {l.farm}
              </option>
            ))}
          </select>

          <input
            name="power"
            value={formData.power}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Power"
          />

          <input
            name="hashRate"
            value={formData.hashRate}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Hash Rate"
          />

          <input
            name="macAddress"
            value={formData.macAddress}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="MAC Address"
          />

          <input
            type="date"
            name="connectionDate"
            value={formData.connectionDate}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <button type="submit" className="bg-blue-900 text-white py-2 rounded-md">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
