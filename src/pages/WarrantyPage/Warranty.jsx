import React, { useState } from "react";
import WarrantyStatsCard from "../../components/warranties/WarrantyStatsCard";
import WarrantyTable from "../../components/warranties/WarrantyTable";
import useWarranty from "../../hooks/useWarranty";
import useWarrantyStats from "../../hooks/useWarrantyStats";
import AddWarrantyPopup from "../../components/warranties/AddWarrantyPopup";

export default function Warranty() {
  // Backend requires: "Manufacturer" and "Intermine"
  const [activeTab, setActiveTab] = useState("Manufacturer");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);

  // Warranty list API
  const { data, isLoading } = useWarranty(page, search);

  // NEW: Warranty stats API
  const { data: statsData } = useWarrantyStats();

  const warranties = data?.warranties || [];
  const totalPages = data?.totalPages || 1;

  // Build stats box safely
  const stats = statsData
    ? [
        {
          title: "Active Warranties",
          value: statsData.active,
          subtitle: "Currently covered",
        },
        {
          title: "Expiring Soon",
          value: statsData.expireSoon,
          subtitle: "Within 30 days",
        },
        {
          title: "Expired",
          value: statsData.expired,
          subtitle: "Need renewal",
        },
        {
          title: "Total Warranties",
          value: statsData.warranties,
          subtitle: "All miners",
        },
      ]
    : [];

  return (
    <div className="lg:p-5 p-3">
      {/* TABS */}

      {/* WARRANTY STATS (Now working!) */}
      <WarrantyStatsCard stats={stats} />

      <button
        onClick={() => setOpenAdd(true)}
        className="mt-5 p-2 bg-blue-900 rounded-md text-white cursor-pointer px-4"
      >
        Add New Warranty
      </button>
      <AddWarrantyPopup open={openAdd} handleClose={() => setOpenAdd(false)} />
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
