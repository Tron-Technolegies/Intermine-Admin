import React from "react";
import { BiChip } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { FaBolt, FaMapMarkerAlt, FaTools, FaUser } from "react-icons/fa";

export default function MinerPopupCards({ miners }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500 text-white";
      case "Warning":
        return "bg-yellow-500 text-white";
      case "offline":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {miners.map((miner, index) => (
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            {/* Chip + titles */}
            <div className="flex items-center gap-3">
              <BiChip className="text-[#3893D0]" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 break-all">
                  {miner.serialNumber}
                </h3>
                <div className="flex gap-2 items-center">
                  <p className="text-sm text-gray-500">{miner.model}</p>
                  <p className="text-sm text-gray-500">{miner.workerId}</p>
                </div>
              </div>
            </div>

            <span
              className={`${getStatusColor(
                miner.status
              )} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}
            >
              {miner.status === "online"
                ? "Online"
                : miner.status === "offline"
                ? "Offline"
                : "In Transit"}
            </span>
          </div>

          <div className="space-y-2 text-[#777] mb-4">
            {/* Client */}
            <div className="flex items-center gap-2">
              <FaUser size={14} />
              <span>{miner.client?.clientName}</span>

              {miner.client?.clientId && (
                <span className="text-xs bg-white px-2 py-1 border border-gray-400 rounded-full">
                  {miner.client.clientId}
                </span>
              )}
            </div>

            {/* Farm */}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt size={14} />
              <span>{miner.location}</span>
            </div>

            {/* Service Provider */}
            <div className="flex items-center gap-2">
              <FaTools size={14} />
              <span>{miner.serviceProvider}</span>
            </div>
          </div>
          {miner.trackingLink && (
            <div className="text-sm">Track - {miner.trackingLink}</div>
          )}

          {/* ---------- METRICS BLOCK ---------- */}
          <div className="flex justify-between sm:justify-start sm:gap-16 py-4 border-t border-b border-gray-100 mb-4">
            {/* Hashrate */}
            <div className="flex items-center gap-2">
              <BiChip size={20} />
              <div>
                <div className="text-lg font-semibold">{miner.hashRate}</div>
                <div className="text-xs text-gray-500">Hash Rate</div>
              </div>
            </div>

            {/* Power */}
            <div className="flex items-center gap-2">
              <FaBolt size={20} />
              <div>
                <div className="text-lg font-semibold">{miner.power}W</div>
                <div className="text-xs text-gray-500">Power</div>
              </div>
            </div>
          </div>

          {/* ---------- WARRANTY & HISTORY ---------- */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <CiCalendar size={18} />
              <span>Warranty: {miner.warranty} Years</span>
            </div>

            <button
              onClick={() => {
                setSelectedMinerId(miner._id);
                setShowHistory(true);
              }}
              className="bg-[#3893D0] text-white px-4 py-2 rounded-lg flex items-center gap-1"
            >
              <MdHistory size={18} /> History
            </button>
          </div>

          {/* ---------- ACTION BUTTONS ---------- */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleEditClick(miner)}
              className="flex-1 bg-[#787878] text-white rounded-xl py-2 font-medium"
            >
              Edit
            </button>

            <button
              onClick={() => setShowReport(true)}
              className="border border-gray-400 text-gray-700 py-2 px-4 rounded-lg"
            >
              Report Issue
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
