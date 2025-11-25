import React from "react";
import PageHeader from "../../components/PageHeader";
import SearchFilterBar from "../../components/SearchFilterBar";
import { FaPen } from "react-icons/fa";

export default function MiningFarm() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Mining Farms"
        subtitle="Manage system configuration, notifications, and administrative settings"
        buttonText="Add Farm"
      />
      {/* Search Bar */}
      <div className="bg-[#F5F5F5] m-4 rounded-lg p-2">
        <p className="text-2xl text-black p-2">Our Farms</p>
        <p className="text-gray-500 pl-2">
          View and manage Mining Farms information for all miners.
        </p>

        <div className="bg-white flex justify-between items-center p-2 rounded-2xl">
          title <FaPen />
        </div>
        <SearchFilterBar placeholder="Search Farm Locations by Model, Sl. No., etc" />
      </div>
    </div>
  );
}
