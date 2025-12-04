import React, { useState } from "react";
import WarrantyStatsCard from "../../components/warranties/WarrantyStatsCard";
import WarrantyTable from "../../components/warranties/WarrantyTable";
import useWarranty from "../../hooks/useWarranty";
import useWarrantyStats from "../../hooks/useWarrantyStats";

export default function Warranty() {
  // Backend requires: "Manufacturer" and "Intermine"
  const [activeTab, setActiveTab] = useState("Manufacturer");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Warranty list API
  const { data, isLoading } = useWarranty(page, activeTab, search);

  // NEW: Warranty stats API
  const { data: statsData } = useWarrantyStats();

  const warranties = data?.warranties || [];
  const totalPages = data?.totalPages || 1;

  // Build stats box safely
  const stats = statsData
    ? [
        { title: "Active Warranties", value: statsData.active, subtitle: "Currently covered" },
        { title: "Expiring Soon", value: statsData.expireSoon, subtitle: "Within 30 days" },
        { title: "Expired", value: statsData.expired, subtitle: "Need renewal" },
        { title: "Total Warranties", value: statsData.warranties, subtitle: "All miners" },
      ]
    : [];

  return (
    <div className="p-5">
      {/* TABS */}
      <div className="flex gap-4 border-b border-[#DCDCDC]">
        <button
          onClick={() => {
            setActiveTab("Manufacturer");
            setPage(1);
          }}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === "Manufacturer" ? "bg-[#E9F2FF] text-black" : "text-gray-500"
          }`}
        >
          Manufacturer Warranty
        </button>

        <button
          onClick={() => {
            setActiveTab("Intermine");
            setPage(1);
          }}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === "Intermine" ? "bg-[#E9F2FF] text-black" : "text-gray-500"
          }`}
        >
          Intermine Warranty
        </button>
      </div>

      {/* WARRANTY STATS (Now working!) */}
      <WarrantyStatsCard stats={stats} />

      {/* WARRANTY TABLE */}
      <WarrantyTable
        data={warranties}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
