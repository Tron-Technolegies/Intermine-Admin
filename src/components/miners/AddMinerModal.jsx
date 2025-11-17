import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function AddMinerModal({ onClose }) {
  const [formData, setFormData] = useState({
    clientName: "Client 01",
    workerAddress: "",
    minerId: "",
    model: "",
    status: "Active",
    minerLocation: "Active",
    warrantyPeriod: "Active",
    poolAddress: "Active",
    connectionDate: "Active",
    invoice: false,
    serviceProvider: "DAHAB",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Added Miner:", formData);
    onClose(); // Close modal after submitting
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-[420px] max-h-[90vh] overflow-y-auto">
        {/*  Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition-all"
        >
          <IoClose size={22} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Add Miner Details</h2>
        <p className="text-sm text-gray-500 mb-5">
          Create a new miner record with a unique identifier.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Client Name */}
          <div>
            <label className="text-sm text-gray-700">Client Name</label>
            <select
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#3893D0]"
            >
              <option>Client 01</option>
              <option>Client 02</option>
              <option>Client 03</option>
            </select>
          </div>

          {/* Worker Address */}
          <div>
            <label className="text-sm text-gray-700">Worker Address</label>
            <input
              type="text"
              name="workerAddress"
              value={formData.workerAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#3893D0]"
              placeholder="Enter worker address"
            />
          </div>

          {/* Miner ID */}
          <div>
            <label className="text-sm text-gray-700">Miner ID / Serial No.</label>
            <input
              type="text"
              name="minerId"
              value={formData.minerId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#3893D0]"
              placeholder="Enter miner ID"
            />
          </div>

          {/* Model */}
          <div>
            <label className="text-sm text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#3893D0]"
              placeholder="Miner Model"
            />
          </div>

          {/* Dropdown fields */}
          {[
            { name: "status", label: "Status" },
            { name: "minerLocation", label: "Miner Location" },
            { name: "warrantyPeriod", label: "Warranty Period" },
            { name: "poolAddress", label: "Pool Address" },
            { name: "connectionDate", label: "Connection Date" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm text-gray-700">{field.label}</label>
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-[#3893D0]"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          ))}

          {/* Invoice */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="invoice"
              checked={formData.invoice}
              onChange={handleChange}
              className="w-4 h-4 accent-[#3893D0]"
            />
            <label className="text-sm text-gray-700">Invoice</label>
          </div>

          {/* Service Provider */}
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-700">Service Provider</label>
            <p className="text-[#3893D0] font-medium ">{formData.serviceProvider}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#2B347A]  text-white font-medium mt-4 py-2 rounded-md transition-all"
          >
            Add Miner
          </button>
        </form>
      </div>
    </div>
  );
}
