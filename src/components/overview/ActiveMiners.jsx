import React, { useState } from "react";
import { FiCpu } from "react-icons/fi";
import useOverviewActions from "../../hooks/useOverviewActions";
import { Link } from "react-router-dom";
import AddMinerModal from "../miners/AddMinerModal";

export default function ActiveMiners() {
  const { miners = [], isLoading } = useOverviewActions();
  const [showAddModal, setShowAddModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-700";
      case "offline":
        return "bg-red-100 text-red-700";
      case "Warning":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) return <p>Loading miners...</p>;

  return (
    <div className="bg-[#F7F8F9] border border-gray-100 rounded-lg p-4 flex-1 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
          <span className="text-[#2B347A]">
            <FiCpu />
          </span>
          Active Miners
        </h3>
        <button
          className="text-sm text-white bg-[#4C98FD] rounded-xl px-2 py-2 font-medium"
          onClick={() => setShowAddModal(true)}
        >
          Connect New
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">Currently operational mining equipment</p>

      <div className="space-y-2">
        {miners.map((miner) => (
          <div
            key={miner._id}
            className="bg-white border border-gray-100 rounded-md px-3 py-2 flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{miner.serialNumber}</p>
              <p className="text-gray-500">{miner.serviceProvider}</p>
            </div>

            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(miner.status)}`}
            >
              {miner.status}
            </span>
          </div>
        ))}
      </div>

      <Link
        to={"/miners"}
        className="text-right text-sm text-blue-600 mt-2 hover:underline cursor-pointer"
      >
        View all
      </Link>
      {showAddModal && <AddMinerModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
