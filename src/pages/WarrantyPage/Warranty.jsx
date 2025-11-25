import React, { useState } from "react";
import WarrantyStatsCard from "../../components/warranties/WarrantyStatsCard";
import WarrantyTable from "../../components/warranties/WarrantyTable";

export default function Warranty() {
  const [activeTab, setActiveTab] = useState("manufacturer");

  const manufacturerStats = [
    { title: "Active Warranties", value: "3", subtitle: "Currently covered" },
    { title: "Expiring Soon", value: "1", subtitle: "Within 30 days" },
    { title: "Expired", value: "1", subtitle: "Need renewal" },
    { title: "Total Warranties", value: "4", subtitle: "All miners" },
  ];

  const intermineStats = [
    { title: "Active Warranties", value: "2", subtitle: "Currently covered" },
    { title: "Expiring Soon", value: "0", subtitle: "Within 30 days" },
    { title: "Expired", value: "1", subtitle: "Need renewal" },
    { title: "Total Warranties", value: "3", subtitle: "All miners" },
  ];

  const manufacturerData = [
    {
      miner: "Antminer S19 Pro",
      client: "John Doe",
      type: "Manufacturer",
      start: "2024-01-15",
      end: "2025-01-15",
      daysRemaining: "120 days",
      status: "Active",
    },
    {
      miner: "Whatsminer M30S++",
      client: "John Doe",
      type: "Manufacturer",
      start: "2024-01-15",
      end: "2025-01-15",
      daysRemaining: "15 days",
      status: "Expiring Soon",
    },
  ];

  const intermineData = [
    {
      miner: "Whatsminer M30S",
      client: "Client A",
      type: "Intermine",
      start: "2024-02-01",
      end: "2025-02-01",
      daysRemaining: "100 days",
      status: "Active",
    },
  ];

  return (
    <div className="p-5">
      {/* TABS */}
      <div className="flex gap-4 border-b border-[#DCDCDC]">
        <button
          onClick={() => setActiveTab("manufacturer")}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === "manufacturer" ? "bg-[#E9F2FF] text-black" : "text-gray-500"
          }`}
        >
          Manufacturer Warranty
        </button>

        <button
          onClick={() => setActiveTab("intermine")}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === "intermine" ? "bg-[#E9F2FF] text-black" : "text-gray-500"
          }`}
        >
          Intermine Warranty
        </button>
      </div>
      {/* CARDS */}
      <WarrantyStatsCard
        stats={activeTab === "manufacturer" ? manufacturerStats : intermineStats}
      />
      {/* TABLE + SEARCH */}
      <WarrantyTable data={activeTab === "manufacturer" ? manufacturerData : intermineData} />
    </div>
  );
}
