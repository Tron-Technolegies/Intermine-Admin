import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaTools,
  FaClock,
  FaBolt,
} from "react-icons/fa";
import useClientDetails from "../../hooks/useClientDetails";

export default function ClientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [expandedMiner, setExpandedMiner] = useState(null);
  const toggleMiner = (m) => setExpandedMiner(expandedMiner === m ? null : m);

  const { data: client, isLoading, error } = useClientDetails(id);

  if (isLoading) return <div className="p-6">Loading client...</div>;
  if (error)
    return <div className="p-6 text-red-500">Failed to load client</div>;

  return (
    <div className="p-6 min-h-screen bg-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-gray-600"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-semibold">{client.clientName}</h1>
      <p className="text-gray-500 mb-4">{client.email}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatBox label="Total Miners" value={client.owned?.length || 0} />
        <StatBox
          label="Online"
          value={client.owned?.filter((m) => m.status === "Online").length}
        />
        <StatBox
          label="In Repair"
          value={client.owned?.filter((m) => m.status === "Repair").length}
        />
        <StatBox
          label="In Warranty"
          value={client.owned?.filter((m) => m.warranty).length}
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Internal Notes</h2>
        <p className="text-sm text-gray-700">
          {client.internalNote?.join(", ") || "No notes added"}
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-3">Miners</h2>

      {client.owned?.length ? (
        client.owned.map((miner) => (
          <div key={miner._id} className="shadow-lg rounded-lg mb-3">
            <div
              onClick={() => toggleMiner(miner._id)}
              className="p-3 flex justify-between items-center cursor-pointer"
            >
              <div>
                <p className="font-medium">SN: {miner.serialNumber}</p>
                <p className="text-xs text-gray-500">
                  {miner.workerName || "Worker Not Assigned"}
                </p>
              </div>

              {expandedMiner === miner._id ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {expandedMiner === miner._id && (
              <div className="p-3 bg-gray-50 border-t">
                <p>Hashrate: {miner.hashRate}</p>
                <p>Power: {miner.power}</p>
                <p>
                  Status: <span className="text-blue-600">{miner.status}</span>
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No miners linked to this client</p>
      )}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-gray-100 text-center p-4 rounded-xl">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}
