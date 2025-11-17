import React from "react";
import { FiDownload, FiSend } from "react-icons/fi";

export default function AgreementTable() {
  const data = [
    {
      user: "John Doe",
      id: "USR-001",
      agreement: "Standard Mining Agreement",
      sent: "2024-01-16",
      signed: "2024-01-18",
      status: "Signed",
      action: "download",
    },
    {
      user: "Jane Smith",
      id: "USR-002",
      agreement: "Standard Mining Agreement",
      sent: "2024-02-15",
      signed: "",
      status: "Pending",
      action: "send",
    },
    {
      user: "Mike Johnson",
      id: "USR-003",
      agreement: "Standard Mining Agreement",
      sent: "2024-01-25",
      signed: "2024-01-26",
      status: "Signed",
      action: "download",
    },
  ];

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6">
      <h2 className="text-lg font-semibold mb-2">User Agreement Status</h2>
      <p className="text-sm text-gray-600 mb-3">
        Track which users have signed agreements and manage electronic signatures.
      </p>

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
          {data.map((item, i) => (
            <tr key={i} className="border-b border-gray-300 bg-blue-50 text-sm">
              <td className="p-3 border-r border-gray-300">
                {item.user}
                <p className="text-xs text-gray-500">{item.id}</p>
              </td>
              <td className="p-3 border-r border-gray-300">{item.agreement}</td>
              <td className="p-3 border-r border-gray-300">{item.sent}</td>
              <td className="p-3 border-r border-gray-300">{item.signed || "---"}</td>
              <td className="p-3 border-r border-gray-300">{item.status}</td>
              <td className="p-3">
                {item.action === "download" ? (
                  <FiDownload size={18} className="cursor-pointer hover:text-blue-500" />
                ) : (
                  <FiSend size={18} className="cursor-pointer hover:text-blue-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
