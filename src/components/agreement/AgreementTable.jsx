import React from "react";
import { FiDownload, FiSend } from "react-icons/fi";

export default function AgreementTable({ data, isLoading, page, totalPages, setPage }) {
  if (isLoading) return <p className="text-center mt-4">Loading agreements...</p>;

  const agreements = data || [];

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6">
      <h2 className="text-lg font-semibold mb-2">User Agreement Status</h2>
      <p className="text-sm text-gray-600 mb-3">
        Track which users have signed agreements and manage electronic signatures.
      </p>

      {/* TABLE */}
      <table className="table-auto w-full border border-gray-300 text-left">
        <thead className="bg-white border-b border-gray-300">
          <tr className="text-sm text-gray-700">
            <th className="p-3 font-medium border-r border-gray-300">User</th>
            <th className="p-3 font-medium border-r border-gray-300">Agreement</th>
            <th className="p-3 font-medium border-r border-gray-300">Sent Date</th>
            <th className="p-3 font-medium border-r border-gray-300">Signed Date</th>
            <th className="p-3 font-medium border-r border-gray-300">Status</th>
            <th className="p-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {agreements.map((item) => {
            const sentDate = new Date(item.issuedOn).toLocaleDateString();
            const signedDate = item.signed ? new Date(item.updatedAt).toLocaleDateString() : "---";

            return (
              <tr key={item._id} className="border-b border-gray-300 bg-blue-50 text-sm">
                <td className="p-3 border-r border-gray-300">
                  {item.user?.clientName || "Unknown"}
                  <p className="text-xs text-gray-500">{item.user?.clientId}</p>
                </td>

                <td className="p-3 border-r border-gray-300">{item.agreementType} Agreement</td>

                <td className="p-3 border-r border-gray-300">{sentDate}</td>

                <td className="p-3 border-r border-gray-300">{signedDate}</td>

                <td className="p-3 border-r border-gray-300">
                  {item.signed ? "Signed" : "Pending"}
                </td>

                <td className="p-3">
                  {item.signed ? (
                    <FiDownload size={18} className="cursor-pointer hover:text-blue-500" />
                  ) : (
                    <FiSend size={18} className="cursor-pointer hover:text-blue-500" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="py-2">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
