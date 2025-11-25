import React from "react";
import { IoClose } from "react-icons/io5";

export default function UpdateWarrantyModal({ onClose }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6 shadow-xl">
        {/* Title + Close Button */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-semibold text-lg">Update Warranty</h2>
            <p className="text-gray-500 text-sm">
              Update the warranty start date for Antminer S19 Pro (MNR-001)
            </p>
          </div>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <IoClose size={22} />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mt-5">
          {/* Type */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Type</label>
            <select className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200">
              <option>Intermine</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Start Date</label>
            <input
              type="date"
              defaultValue="2025-01-15"
              className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">End Date</label>
            <input
              type="date"
              defaultValue="2025-01-15"
              className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          {/* Preview Text */}
          <p className="text-gray-600 text-sm">
            Warranty will end on: <span className="font-medium">January 15th, 2025</span>
          </p>

          {/* Button */}
          <button className="bg-[#1d1f7c] text-white w-full py-2 rounded-lg font-medium hover:opacity-90">
            Update Warranty
          </button>
        </div>
      </div>
    </div>
  );
}
