import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import UpdateWarrantyModal from "./UpdateWarrantyModal";

export default function WarrantyTable({ data }) {
  const [search, setSearch] = useState("");
  const [warrantyModal, showWarrantyModal] = useState(false);

  const filtered = data.filter(
    (item) =>
      item.miner.toLowerCase().includes(search.toLowerCase()) ||
      item.client.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-10 bg-[#F5F5F5] p-5 rounded-2xl shadow-sm">
      <p className="text-xl font-semibold">All Warranties</p>
      <p className="text-gray-500 mb-4 text-sm">
        View and manage warranty information for all miners. Update warranty start dates as needed.
      </p>

      {/* SEARCH */}
      <div className="flex w-full p-3 border border-[#DCDCDCDC] text-[#787878] rounded-xl mb-5 gap-2 bg-white">
        <CiSearch className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search by Miner, Client or Status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#DCDCDC]">
          <thead>
            <tr className="bg-white text-left">
              <th className="p-3">Miner</th>
              <th className="p-3">Client</th>
              <th className="p-3">Type</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Days Left</th>
              <th className="p-3">Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className="border-y border-[#DCDCDC] bg-[#E9F2FF]">
                <td className="p-3">{item.miner}</td>
                <td className="p-3">{item.client}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.start}</td>
                <td className="p-3">{item.end}</td>
                <td className="p-3">{item.daysRemaining}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      item.status === "Active"
                        ? "bg-green-500"
                        : item.status === "Expired"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* FIXED BUTTON */}
                <td className="p-2">
                  <FiEdit
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => showWarrantyModal(true)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FIXED MODAL CONDITION */}
        {warrantyModal && <UpdateWarrantyModal onClose={() => showWarrantyModal(false)} />}

        {filtered.length === 0 && (
          <p className="text-center py-5 text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}
