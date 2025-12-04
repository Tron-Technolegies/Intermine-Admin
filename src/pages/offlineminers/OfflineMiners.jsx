import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchFilterBar from "../../components/SearchFilterBar";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function OfflineMiners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  // Custom dropdown component
  const OfflineStatusDropdown = () => (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="All Status">All Status</option>
      <option value="offline">Offline</option>
      <option value="repair">Under Repair</option>
      <option value="warranty">Under Warranty</option>
      <option value="network">Network Issue</option>
      <option value="psu">PSU Issue</option>
    </select>
  );

  // ======================  FETCH OFFLINE MINERS API  ======================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["offlineMiners", currentPage, searchTerm, statusFilter],
    queryFn: async () => {
      const res = await api.get(`/api/v1/admin/miner/offline`, {
        params: {
          currentPage: currentPage || 1,
          query: searchTerm || "",
          status: statusFilter === "All Status" ? "" : statusFilter,
        },
      });

      return res.data;
    },
    keepPreviousData: true,
  });

  const miners = data?.miners || [];
  const totalPages = data?.totalPages || 1;

  const getStatusBadge = (status) => {
    const colors = {
      offline: "bg-yellow-100 text-yellow-700",
      Warranty: "bg-blue-100 text-blue-700",
      Pending: "bg-purple-100 text-purple-700",
      repair: "bg-purple-100 text-purple-700",
    };

    return colors[status] || "bg-gray-100 text-gray-600";
  };

  // =======================================================================

  return (
    <div>
      <PageHeader
        title="Offline Miners"
        subtitle="Monitor and manage miners that are currently offline or disconnected."
      />

      {/* SEARCH + FILTER BAR */}
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={(v) => {
          setCurrentPage(1);
          setSearchTerm(v);
        }}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        customDropdown={<OfflineStatusDropdown />}
      />

      {/* LOADING & ERROR */}
      {isLoading && <p className="text-center mt-6">Loading offline miners...</p>}
      {isError && <p className="text-center text-red-500 mt-6">Failed to load miners</p>}

      {/* TABLE */}
      <div className="bg-white mt-4 rounded-xl p-4 shadow-sm border border-gray-200 text-[#616161] overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="text-left text-gray-600 text-sm border-b">
              <th className="py-3 px-2">SL No</th>
              <th className="py-3 px-2">Owner</th>
              <th className="py-3 px-2">Model</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Issue</th>
              <th className="py-3 px-2">Mining Farm</th>
              <th className="py-3 px-2">Provider</th>
              <th className="py-3 px-2">Message</th>
            </tr>
          </thead>

          <tbody>
            {miners.map((m) => (
              <tr key={m._id} className="border-b text-sm">
                <td className="py-3 px-2">{m.serialNumber}</td>

                <td className="py-3 px-2">
                  {m.client?.clientName}{" "}
                  <span className="text-xs text-gray-400">({m.client?.clientId})</span>
                </td>

                <td className="py-3 px-2">{m.model}</td>

                <td className="py-3 px-2">
                  <span className={`${getStatusBadge(m.status)} px-3 py-1 rounded-full text-xs`}>
                    {m.status}
                  </span>
                </td>

                <td className="py-3 px-2">{m.currentIssue?.issue?.issueType || "-"}</td>

                <td className="py-3 px-2">{m.location}</td>

                <td className="py-3 px-2">{m.serviceProvider}</td>

                <td className="py-3 px-2">
                  {m.currentIssue ? (
                    <>
                      {m.currentIssue.status}{" "}
                      <span className="text-[10px] pl-2">
                        {new Date(m.currentIssue.updatedAt).toLocaleTimeString()}
                      </span>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}

            {miners.length === 0 && !isLoading && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No offline miners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
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
    </div>
  );
}
