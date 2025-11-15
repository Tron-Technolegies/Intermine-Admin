import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaBolt, FaFileContract } from "react-icons/fa";

export default function ClientCard({ client, onViewDetails }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-[#F5F5F5] border border-[#DADADA] rounded-xl p-4 transition-all cursor-pointer ${
        expanded ? "shadow-sm" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header Section (Always Visible) */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.id}</p>
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            client.status === "Active"
              ? "bg-green-100 text-green-700"
              : client.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {client.status}
        </span>
      </div>

      {/* Expanded Section */}
      {expanded && (
        <div className="mt-4 border-t border-[#DADADA] pt-3 space-y-2">
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{client.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400" />
              <span>Joined {client.joined}</span>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-[#DADADA] pt-3 text-sm text-gray-700">
            <div>
              <span className="font-semibold">{client.miners}</span>
              <p className="text-xs text-gray-500">Miners</p>
            </div>
            <div className="flex items-center gap-1">
              <FaBolt className="text-gray-500" />
              <div>
                <span className="font-semibold">{client.consumption}</span>
                <p className="text-xs text-gray-500">Consumption</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <FaFileContract className="text-gray-500" />
              <p className="text-xs text-gray-500">
                Agreement{" "}
                {client.agreement ? (
                  <span className="text-green-600 font-bold">✔</span>
                ) : (
                  <span className="text-red-500 font-bold">✘</span>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(client);
              }}
              className="flex-1 bg-[#787878] hover:bg-[#5f5f5f] text-white rounded-lg font-medium py-2 transition-colors"
            >
              View Details
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-[#FFA800] hover:bg-[#e69c00] text-white rounded-lg font-medium py-2 transition-colors"
            >
              Send Agreement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
