import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchFilterBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  placeholder = "Search by name, email, or ID...",
  customDropdown,
}) {
  return (
    <div className="rounded-lg p-4 bg-[#F5F5F5] mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">All Records</h1>
        <p className="text-gray-600">View and filter items by status, provider, or location.</p>
      </div>

      {/* Search & Filter */}
      <div className="p-4 mb-6 flex gap-4 items-center">
        <div className="flex-1 relative">
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* If a custom dropdown is passed, show it only for that page */}
        {customDropdown ? (
          customDropdown
        ) : (
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
