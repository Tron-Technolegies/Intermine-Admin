import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function AddMinerModal({ onClose }) {
  const { data: clients, isLoading: loadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get("api/v1/admin/user/all", {
        params: {
          query: "",
          currentPage: 1,
          status: "ALL",
        },
      });
      return res.data.clients;
    },
  });

  const { data: locations, isLoading: loadingLocations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await api.get("/api/v1/mining-farms", {
        params: {
          currentPage: 1,
          location: "",
          query: "",
          status: "ALL",
        },
      });
      return res.data;
    },
  });

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
    serviceProvider: "DAHAB",
    hashRate: "",
    power: "",
    macAddress: "",
    warrantyType: "",
  });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // --- validation (required by backend) ---
  const validate = (data) => {
    const errors = [];
    if (!data.hashRate) errors.push("Hash Rate is required");
    if (!data.power) errors.push("Power is required");
    if (!data.macAddress) errors.push("Mac Address is required");
    return errors;
  };

  const addMiner = useMutation({
    mutationFn: (payload) => api.post("/api/v1/admin/miner/add", payload),
    onSuccess: () => {
      toast.success("Miner Added Successfully");
      setTimeout(onClose, 400);
    },
    onError: (err) => {
      console.log("ADD MINER ERROR:", err.response?.data);
      const message =
        err.response?.data?.message || err.response?.data?.error || "Failed to add miner";
      toast.error(message);
    },
  });

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

        <h2 className="text-xl font-semibold mb-1">Add Miner Details</h2>
        <p className="text-gray-500 text-sm mb-4">Create a new miner record.</p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const cleaned = {
              client: formData.client,
              workerId: formData.workerId.trim(),
              serialNumber: formData.serialNumber.trim(),
              model: formData.model.trim(),
              status: formData.status,
              location: formData.location,
              warranty: Number(formData.warranty),
              warrantyType: formData.warrantyType,
              poolAddress: formData.poolAddress.trim(),
              connectionDate: formData.connectionDate,
              serviceProvider: formData.serviceProvider,
              hashRate: Number(formData.hashRate),
              power: Number(formData.power),
              macAddress: formData.macAddress.trim(),
            };

            const errors = validate(cleaned);
            if (errors.length) {
              toast.error(errors.join(", "));
              return;
            }

            addMiner.mutate(cleaned);
          }}
          className="flex flex-col gap-3"
        >
          {/* CLIENT DROPDOWN */}
          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="w-full border p-2 rounded-md mt-1"
          >
            <option value="">Select Client</option>
            {!loadingClients &&
              clients?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
          </select>

          {/* WORKER ADDRESS */}
          <input
            name="workerId"
            placeholder="Worker Address"
            value={formData.workerId}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          {/* SERIAL/MINER ID */}
          <input
            name="serialNumber"
            placeholder="Miner Serial Number"
            value={formData.serialNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          {/* MODEL */}
          <input
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          {/* STATUS */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {/* LOCATION DROPDOWN */}
          <div>
            <label className="text-sm font-medium">Miner Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            >
              <option value="">Select Location</option>
              {!loadingLocations &&
                locations?.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.farm}
                  </option>
                ))}
            </select>
          </div>

          {/* WARRANTY */}
          <input
            name="warranty"
            placeholder="Warranty Period"
            value={formData.warranty}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          <select
            name="warrantyType"
            value={formData.warrantyType}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select Warranty Type</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Intermine">Intermine</option>
          </select>

          {/* POOL ADDRESS */}
          <input
            name="poolAddress"
            placeholder="Pool Address"
            value={formData.poolAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          {/* HASH RATE (required) */}
          <input
            name="hashRate"
            type="number"
            placeholder="Hash Rate"
            value={formData.hashRate}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          {/* POWER (required) */}
          <input
            name="power"
            type="number"
            placeholder="Power"
            value={formData.power}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          {/* MAC ADDRESS (required) */}
          <input
            name="macAddress"
            placeholder="MAC Address"
            value={formData.macAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          {/* CONNECTION DATE */}
          <input
            type="date"
            name="connectionDate"
            value={formData.connectionDate}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />

          {/* ADD BTN */}
          <button
            type="submit"
            className="bg-[#2B347A] text-white py-2 rounded-md mt-2 disabled:opacity-50"
            disabled={addMiner.isPending}
          >
            {addMiner.isPending ? "Adding..." : "Add Miner"}
          </button>
        </form>
      </div>
    </div>
  );
}
