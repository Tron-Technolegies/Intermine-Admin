import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUser, FaMapMarkerAlt, FaBolt, FaTools } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { BiChip } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";

import MinersHistoryModal from "./MinersHistoryModal";
import ReportIssueModal from "../overview/ReportIssueModal";
import EditMinerModal from "./EditMinerModal";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const fetchMiners = async ({ queryKey }) => {
  const [_key, { page, query, status }] = queryKey;

  const res = await api.get("/api/v1/admin/miner", {
    params: {
      currentPage: page,
      query: query || "",
      status: status || "ALL",
    },
  });

  return res.data;
};

export default function AllMiners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedMinerId, setSelectedMinerId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedMiner, setSelectedMiner] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "miners",
      { page: currentPage, query: searchTerm, status: statusFilter },
    ],
    queryFn: fetchMiners,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const miners = data?.miners ?? [];
  const totalPages = data?.totalPages ?? 1;

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

  const handleEditClick = (miner) => {
    setSelectedMiner(miner);
    setEditForm(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="rounded-lg p-4 bg-[#F5F5F5]">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">All Miners</h1>
        <p className="text-gray-600">Search, filter and manage miners.</p>

        <div className="p-4 mb-6 flex gap-4 items-center">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search miner ID, user, model..."
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchTerm(e.target.value);
              }}
              className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg 
              focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setCurrentPage(1);
              setStatusFilter(e.target.value);
            }}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg 
            focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="ALL">All Status</option>
            <option value="online">Online</option>
            <option value="Warning">Warning</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {isLoading && (
        <p className="text-center mt-10 font-semibold">Loading miners...</p>
      )}
      {isError && (
        <p className="text-center text-red-500 mt-10">No miners found</p>
      )}

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
                  : "Warning"}
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

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-2 py-2 font-medium">
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
      {showHistory && selectedMinerId && (
        <MinersHistoryModal
          minerId={selectedMinerId}
          onClose={() => {
            setSelectedMinerId(null);
            setShowHistory(false);
          }}
        />
      )}
      {showReport && <ReportIssueModal onClose={() => setShowReport(false)} />}
      {editForm && selectedMiner && (
        <EditMinerModal
          minerData={selectedMiner}
          onClose={() => setEditForm(false)}
        />
      )}
    </div>
  );
}
