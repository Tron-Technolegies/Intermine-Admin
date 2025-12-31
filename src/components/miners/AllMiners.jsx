import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import MinersHistoryModal from "./MinersHistoryModal";
import ReportIssueModal from "../overview/ReportIssueModal";
import EditMinerModal from "./EditMinerModal";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import Loading from "../Loading";
import MinerTable from "./MinerTable";

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
  const [debounced, setDebounced] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // const [selectedMinerId, setSelectedMinerId] = useState(null);
  // const [showHistory, setShowHistory] = useState(false);
  // const [showReport, setShowReport] = useState(false);
  // const [editForm, setEditForm] = useState(false);
  // const [selectedMiner, setSelectedMiner] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "miners",
      { page: currentPage, query: debounced, status: statusFilter },
    ],
    queryFn: fetchMiners,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const miners = data?.miners || [];
  const totalPages = data?.totalPages || 1;

  const handleEditClick = (miner) => {
    setSelectedMiner(miner);
    setEditForm(true);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchTerm);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

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
            <option value="ALL">All</option>
            <option value="online">Online</option>
            <option value="In Transit">In Transit</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {isLoading && <Loading />}
      {isError && (
        <p className="text-center text-red-500 mt-10">No miners found</p>
      )}
      <MinerTable miners={miners} />
    </div>
  );
}

{
  /* <div className="flex justify-center gap-4 mt-8">
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
</div>;
{
  showHistory && selectedMinerId && (
    <MinersHistoryModal
      minerId={selectedMinerId}
      onClose={() => {
        setSelectedMinerId(null);
        setShowHistory(false);
      }}
    />
  );
}
{
  showReport && <ReportIssueModal onClose={() => setShowReport(false)} />;
}
{
  editForm && selectedMiner && (
    <EditMinerModal
      minerData={selectedMiner}
      onClose={() => setEditForm(false)}
    />
  );
} */
}
