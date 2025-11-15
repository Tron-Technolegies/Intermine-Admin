import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaClock, FaTools, FaBolt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";

export default function ClientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expandedMiner, setExpandedMiner] = useState(null);

  const client = {
    name: "John Smith",
    email: "john.smith@email.com",
    stats: {
      total: 3,
      online: 1,
      inRepair: 0,
      inWarranty: 2,
    },
    notes: "Always responds quickly to communications. Prefers email over phone calls.",
    miners: [
      {
        id: 1,
        serial: "AS19001234",
        connectionDate: "2024-01-20",
        workerName: "worker_001",
        status: "Offline",
        hashRate: "110 TH/s",
        power: "90W",
        note: "Recently serviced - running optimally",
        reportTime: "11:30 am",
        fixedTime: "2:30 pm",
      },
      {
        id: 2,
        serial: "AS19004567",
        connectionDate: "2024-01-20",
        workerName: "worker_001",
        status: "Online",
        hashRate: "110 TH/s",
        power: "90W",
        note: "Recently serviced - running optimally",
        reportTime: "11:30 am",
        fixedTime: "2:30 pm",
      },
    ],
  };

  const toggleMiner = (id) => {
    setExpandedMiner(expandedMiner === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-700";
      case "Offline":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      {/* Back button and Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-black mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
      <p className="text-gray-500 mb-6">{client.email}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Miners", value: client.stats.total },
          { label: "Online", value: client.stats.online },
          { label: "In repair", value: client.stats.inRepair },
          { label: "In Warranty", value: client.stats.inWarranty },
        ].map((stat, index) => (
          <div key={index} className="bg-[#E9F2FF] rounded-3xl p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Internal Notes */}
      <div className="bg-[#F7F9FC] border border-[#E3E3E3] rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
          <h2 className="font-semibold text-gray-800">Internal Notes - {client.name}</h2>
          <button className="text-sm flex items-center border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100">
            <TbEdit className="mr-2" /> Edit Note
          </button>
        </div>
        <p className="text-sm text-gray-600">{client.notes}</p>
      </div>

      {/* Miners Section */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Miners</h2>
      <div className="space-y-4">
        {client.miners.map((miner) => (
          <div
            key={miner.id}
            className="border border-[#DADADA] rounded-lg bg-[#FDFDFD] overflow-hidden shadow-sm"
          >
            {/* Miner Header (clickable) */}
            <div
              className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-sm text-gray-800 p-4 cursor-pointer hover:bg-gray-50 transition-all"
              onClick={() => toggleMiner(miner.id)}
            >
              <div>
                <p className="text-gray-500">Serial Number</p>
                <p className="font-medium">{miner.serial}</p>
              </div>
              <div>
                <p className="text-gray-500">Connection Date</p>
                <p className="font-medium">{miner.connectionDate}</p>
              </div>
              <div>
                <p className="text-gray-500">Worker Name</p>
                <p className="font-medium">{miner.workerName}</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-gray-500">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(
                    miner.status
                  )}`}
                >
                  {miner.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500">Hash Rate</p>
                <p className="font-medium">{miner.hashRate}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-start">
                <div>
                  <p className="text-gray-500">Power</p>
                  <p className="font-medium">{miner.power}</p>
                </div>
                <span className="sm:hidden">
                  {expandedMiner === miner.id ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </span>
              </div>
            </div>

            {/* Expanded Section */}
            {expandedMiner === miner.id && (
              <div className="border-t border-[#E5E5E5] bg-white p-4 animate-slideDown">
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Internal Note:</strong> {miner.note}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <p>
                      <FaClock className="inline mr-1" /> Report: {miner.reportTime}
                    </p>
                    <p>
                      <FaTools className="inline mr-1" /> Fixed: {miner.fixedTime}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="text-xs border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100">
                      Add Issue
                    </button>
                    <button className="text-xs bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1 rounded-md hover:bg-blue-200">
                      Request Pool Change
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
