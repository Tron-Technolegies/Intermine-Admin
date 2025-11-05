import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ReportIssueModal({ onClose }) {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50 ">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">Report an Issue</h2>
        <p className="text-sm text-gray-500 mb-4">Create a new issue with a unique ID.</p>

        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Worker Address</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#2B347A]"
              placeholder="Enter Worker Address"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Miner Details</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#2B347A]"
              placeholder="Enter Miner Details"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Report what issue</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#2B347A]">
              <option>Low Hashrate</option>
              <option>Overheating</option>
              <option>Network Issue</option>
              <option>Power Failure</option>
            </select>
          </div>

          {/* Machine Status Toggle */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-700 font-medium">Machine Status</span>
            <div
              onClick={() => setIsOnline(!isOnline)}
              className={`relative w-12 h-6 flex items-center rounded-full cursor-pointer transition ${
                isOnline ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                  isOnline ? "translate-x-6" : "translate-x-1"
                }`}
              ></div>
            </div>
            <span
              className={`text-sm ml-2 font-medium ${
                isOnline ? "text-green-600" : "text-gray-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Button */}
        <button className="w-full bg-[#2B347A] text-white py-2 rounded-md mt-5 hover:bg-[#242b66] transition text-sm font-medium">
          Send to Service Provider
        </button>
      </div>
    </div>
  );
}
