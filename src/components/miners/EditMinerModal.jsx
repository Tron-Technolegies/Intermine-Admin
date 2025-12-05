import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function EditMinerModal({ minerData, onClose }) {
  // ====== Fetch Clients ======
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
    hashRate: "",
    power: "",
    macAddress: "",
  });

  useEffect(() => {
    if (minerData) {
      setFormData({
        client: minerData.client?._id || "",
        workerId: minerData.workerId || "",
        serialNumber: minerData.serialNumber || "",
        model: minerData.model || "",
        status: minerData.status || "online",
        location: minerData.location?._id || "",
        warranty: minerData.warranty || "",
        poolAddress: minerData.poolAddress || "",
        connectionDate: minerData.connectionDate?.split("T")[0] || "",
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
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateMiner.mutate({
      client: formData.client,
      workerId: formData.workerId,
      serialNumber: formData.serialNumber,
      model: formData.model,
      status: formData.status,
      location: formData.location,
      warranty: formData.warranty,
      poolAddress: formData.poolAddress,
      connectionDate: formData.connectionDate,
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
      <div className="bg-white rounded-xl w-[92%] sm:w-96 max-h-[75vh] overflow-y-auto p-5 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-2">Edit Miner</h2>

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

          {/* WORKER ID */}
          <input
            name="workerId"
            value={formData.workerId}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Worker ID"
          />

          {/* SERIAL NUMBER */}
          <input
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Serial Number"
          />

          {/* MODEL */}
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
            {locations?.map((farm) => (
              <option key={farm._id} value={farm._id}>
                {farm.farm}
              </option>
            ))}
          </select>

          {/* WARRANTY */}
          <input
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Warranty (years)"
          />

          {/* POOL ADDRESS */}
          <input
            name="poolAddress"
            value={formData.poolAddress}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Pool Address"
          />

          {/* CONNECTION DATE */}
          <input
            type="date"
            name="connectionDate"
            value={formData.connectionDate}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          {/* HASH RATE */}
          <input
            name="hashRate"
            value={formData.hashRate}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Hash Rate"
          />

          {/* POWER */}
          <input
            name="power"
            value={formData.power}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Power (W)"
          />

          {/* MAC ADDRESS */}
          <input
            name="macAddress"
            value={formData.macAddress}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="MAC Address"
          />

          <button type="submit" className="bg-blue-900 text-white py-2 rounded-md">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
