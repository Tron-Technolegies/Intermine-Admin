import React, { useState } from "react";

export default function ReportIssueModal({ onClose }) {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[400px] p-5 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Report an Issue</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Worker Address</label>
            <input
              type="text"
              placeholder="Enter worker address"
              className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Miner Details</label>
            <input
              type="text"
              placeholder="Enter miner details"
              className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Report what issue</label>
            <select className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200">
              <option>Low Hashrate</option>
              <option>Overheating</option>
              <option>Connection Issue</option>
              <option>Power Failure</option>
            </select>
          </div>
        </div>
        {/* Machine Toggle */}
        <div className="flex gap-4 items-center mt-4">
          <label className="font-medium text-gray-700">Machine</label>
          <div
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center cursor-pointer ${
              isOnline ? "text-green-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  isOnline ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm">{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>

        {/* Button */}
        <button className="bg-indigo-600 text-white w-full mt-5 py-2 rounded-lg">
          Send to Service Provider
        </button>
      </div>
    </div>
  );
}
