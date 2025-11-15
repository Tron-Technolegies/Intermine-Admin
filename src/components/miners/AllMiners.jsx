import React, { useState } from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import { FaUser, FaMapMarkerAlt, FaBolt, FaTools } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { BiChip } from "react-icons/bi";
import MinersHistoryModal from "./MinersHistoryModal";
import ReportIssueModal from "../overview/ReportIssueModal";
import { CiCalendar } from "react-icons/ci";
import EditMinerModal from "./EditMinerModal";

export default function AllMiners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showHistory, setShowHistory] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedMiner, setSelectedMiner] = useState(null);

  const miners = [
    {
      id: "ASIC-S19-847",
      model: "Antminer S19 Pro",
      status: "Online",
      user: "John Smith",
      userId: "USR-001",
      location: "Texas Data Centre A",
      provider: "Genesis Mining",
      hashRate: "95.2 TH/s",
      power: "60W",
      warranty: "15/01/2025",
    },
    {
      id: "ASIC-S19-623",
      model: "Antminer S19 Pro",
      status: "Warning",
      user: "Sarah Johnson",
      userId: "USR-002",
      location: "Texas Data Centre A",
      provider: "Genesis Mining",
      hashRate: "89.1 TH/s",
      power: "60W",
      warranty: "15/01/2025",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "bg-green-500 text-white";
      case "Warning":
        return "bg-yellow-500 text-white";
      case "Offline":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // 🧩 Handle Edit button click
  const handleEditClick = (miner) => {
    setSelectedMiner(miner); // store selected miner data
    setEditForm(true); // open edit modal
  };

  return (
    <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="rounded-lg p-4 bg-[#F5F5F5]">
        <div className="mb-6 ">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">All Miners</h1>
          <p className="text-gray-600">
            View and filter miners by status, hosting provider, and farm location.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className=" p-4 mb-6 flex gap-4 items-center">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by miner ID, user, or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option>All Status</option>
              <option>Online</option>
              <option>Warning</option>
              <option>Offline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Miner Cards Grid */}
      <div className="mt-4">
        <div className="grid md:grid-cols-2 gap-6">
          {miners.map((miner, index) => (
            <div key={index} className="bg-[#F5F5F5] rounded-xl  p-6">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className=" p-2 rounded-lg">
                    <BiChip className="text-[#3893D0]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{miner.id}</h3>
                    <p className="text-sm text-gray-500">{miner.model}</p>
                  </div>
                </div>
                <span
                  className={`${getStatusColor(
                    miner.status
                  )} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {miner.status}
                </span>
              </div>

              {/* Miner Details */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUser className="text-gray-400" size={14} />
                  <span className="text-sm">{miner.user}</span>
                  <span className="text-xs bg-white text-gray-600 px-2 py-0.5 border border-[#DCDCDC] rounded-2xl">
                    {miner.userId}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaMapMarkerAlt className="text-gray-400" size={14} />
                  <span className="text-sm">{miner.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaTools className="text-gray-400" size={14} />
                  <span className="text-sm">{miner.provider}</span>
                </div>
              </div>

              {/* Hash Rate and Power */}
              <div className="flex gap-6 mb-4 pb-4 border-b border-gray-100 mt-8 ">
                <div className="flex items-center gap-2">
                  <BiChip className="text-gray-700" size={20} />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{miner.hashRate}</div>
                    <div className="text-xs text-gray-500">Hash Rate</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaBolt className="text-gray-700" size={20} />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{miner.power}</div>
                    <div className="text-xs text-gray-500">Power</div>
                  </div>
                </div>
              </div>

              {/* Warranty and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <CiCalendar className="text-[#787878]" size={18} />
                  <span className="text-sm">Warranty: {miner.warranty}</span>
                </div>
                <button
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-1.5 text-white hover:text-white bg-[#3893D0] rounded-lg px-4 py-2 text-sm font-medium"
                >
                  <MdHistory size={18} />
                  History
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEditClick(miner)}
                  className="flex-1 bg-[#787878] text-white rounded-2xl font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowReport(true)}
                  className="px-4 border border-[#B1B1B1] text-gray-700 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Report an Issue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showHistory && <MinersHistoryModal onClose={() => setShowHistory(false)} />}
      {showReport && <ReportIssueModal onClose={() => setShowReport(false)} />}
      {editForm && selectedMiner && (
        <EditMinerModal minerData={selectedMiner} onClose={() => setEditForm(false)} />
      )}
    </div>
  );
}
