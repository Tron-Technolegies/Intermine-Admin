import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function AddMinerModal({ onClose }) {
  const [formData, setFormData] = useState({
    clientName: "Client 01",
    workerAddress: "",
    minerId: "",
    model: "",
    status: "Active",
    minerLocation: "Active",
    warrantyPeriod: "",
    poolAddress: "",
    connectionDate: "",
    invoice: false,
    serviceProvider: "DAHAB",

    // extra fields without UI (temporary static values)
    hashRate: "0",
    power: "0",
    macAddress: "00:00:00:00",
    warrantyType: "standard",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // **Convert UI → Backend Format**
  const preparePayload = () => ({
    client: formData.clientName, // Must be MongoDB _id (change later when API available)
    workerId: formData.workerAddress,
    serialNumber: formData.minerId,
    model: formData.model,
    status: formData.status,
    location: formData.minerLocation,
    warranty: formData.warrantyPeriod,
    warrantyType: formData.warrantyType,
    poolAddress: formData.poolAddress,
    connectionDate: formData.connectionDate,
    serviceProvider: formData.serviceProvider,
    hashRate: formData.hashRate,
    power: formData.power,
    macAddress: formData.macAddress,
  });

  const addMiner = useMutation({
    mutationFn: () => api.post("/api/v1/admin/miner/add", preparePayload()),
    onSuccess: () => {
      toast.success("Miner Added Successfully");
      setTimeout(onClose, 600);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to add miner");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMiner.mutate();
  };

  const closeOverlay = (e) => {
    if (e.target.id === "overlay") onClose();
  };

  return (
    <div
      id="overlay"
      onClick={closeOverlay}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-[420px] max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3">
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">Add Miner Details</h2>
        <p className="text-sm text-gray-500 mb-5">
          Create a new miner record with a unique identifier.
        </p>

        {/* ⚠️ UI REMAINS EXACTLY SAME BELOW — Nothing changed visually */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-700">Client Name</label>
            <select
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            >
              <option>Client 01</option>
              <option>Client 02</option>
              <option>Client 03</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Worker Address</label>
            <input
              name="workerAddress"
              value={formData.workerAddress}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Miner ID / Serial No</label>
            <input
              name="minerId"
              value={formData.minerId}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Model</label>
            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Miner Location</label>
            <select
              name="minerLocation"
              value={formData.minerLocation}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Warranty Period</label>
            <input
              name="warrantyPeriod"
              value={formData.warrantyPeriod}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Pool Address</label>
            <input
              name="poolAddress"
              value={formData.poolAddress}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Connection Date</label>
            <input
              type="date"
              name="connectionDate"
              value={formData.connectionDate}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            />
          </div>

          <button className="bg-[#2B347A] text-white mt-4 py-2 rounded-md">
            {addMiner.isPending ? "Adding..." : "Add Miner"}
          </button>
        </form>
      </div>
    </div>
  );
}
