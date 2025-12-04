import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import UpdateWarrantyModal from "./UpdateWarrantyModal";
import dayjs from "dayjs";

export default function WarrantyTable({
  data,
  isLoading,
  search,
  setSearch,
  page,
  setPage,
  totalPages,
}) {
  const [editItem, setEditItem] = useState(null);

  const calcDaysRemaining = (endDate) => {
    const diff = dayjs(endDate).diff(dayjs(), "day");
    return diff + " days";
  };

  const getStatus = (endDate) => {
    const days = dayjs(endDate).diff(dayjs(), "day");
    if (days < 0) return "Expired";
    if (days <= 30) return "Expiring Soon";
    return "Active";
  };

  return (
    <div className="mt-10 bg-[#F5F5F5] p-5 rounded-2xl shadow-sm">
      <p className="text-xl font-semibold">All Warranties</p>
      <p className="text-gray-500 mb-4 text-sm">
        View and manage warranty information for all miners.
      </p>

      {/* SEARCH BAR */}
      <div className="flex w-full p-3 border border-[#DCDCDCDC] rounded-xl mb-5 gap-2 bg-white text-[#787878]">
        <CiSearch className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search warranties by Miner ID, Model or Owner"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#DCDCDC] min-w-[900px]">
          <thead>
            <tr className="bg-white text-left">
              <th className="p-3">Miner</th>
              <th className="p-3">Client</th>
              <th className="p-3">Type</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Days Remaining</th>
              <th className="p-3">Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!isLoading &&
              data.map((w) => (
                <tr key={w._id} className="border-y border-[#DCDCDC] bg-[#E9F2FF]">
                  <td className="p-3">
                    {w.miner?.model}
                    <br />
                    <span className="text-xs text-gray-500">SN: {w.miner?.serialNumber}</span>
                  </td>
                  <td className="p-3">
                    {w.user?.clientName}
                    <br />
                    <span className="text-xs text-gray-500">{w.user?.clientId}</span>
                  </td>

                  <td className="p-3">{w.warrantyType}</td>
                  <td className="p-3">{dayjs(w.startDate).format("YYYY-MM-DD")}</td>
                  <td className="p-3">{dayjs(w.endDate).format("YYYY-MM-DD")}</td>

                  {/* Days Remaining */}
                  <td className="p-3">{calcDaysRemaining(w.endDate)}</td>

                  {/* STATUS BADGE */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        getStatus(w.endDate) === "Active"
                          ? "bg-green-600"
                          : getStatus(w.endDate) === "Expired"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {getStatus(w.endDate)}
                    </span>
                  </td>

                  <td className="p-2">
                    <FiEdit className="w-5 h-5 cursor-pointer" onClick={() => setEditItem(w)} />
                  </td>
                </tr>
              ))}

            {!isLoading && data.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-5 text-gray-500">
                  No warranties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-2 py-2 font-medium">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* UPDATE WARRANTY MODAL */}
      {editItem && <UpdateWarrantyModal item={editItem} onClose={() => setEditItem(null)} />}
    </div>
  );
}
