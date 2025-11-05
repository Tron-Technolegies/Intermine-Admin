import React from "react";
import { FiCpu } from "react-icons/fi";

const miners = [
  { id: "ASIC-S19-847", status: "Online", provider: "Dahab" },
  { id: "ASIC-S19-623", status: "Warning", provider: "Binance Pool" },
  { id: "ASIC-S19-847", status: "Online", provider: "Dahab" },
  { id: "ASIC-S19-847", status: "Online", provider: "Dahab" },
];

export default function ActiveMiners() {
  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-700";
      case "Warning":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-[#F7F8F9] border border-gray-100 rounded-lg p-4  px-10 flex-1 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
          <span className="text-[#2B347A]">
            <FiCpu />
          </span>{" "}
          Active Miners
        </h3>
        <button className="text-sm text-white bg-[#4C98FD] rounded-xl px-2 py-2 font-medium hover:bg-[#4C98FD">
          Connect New
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">Currently operational mining equipment</p>

      <div className="space-y-2">
        {miners.map((miner, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-md px-3  py-2 flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{miner.id}</p>
              <p className="text-gray-500">{miner.provider}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(miner.status)}`}
            >
              {miner.status}
            </span>
          </div>
        ))}
      </div>

      <p className="text-right text-sm text-blue-600 mt-2 hover:underline cursor-pointer">
        View all
      </p>
    </div>
  );
}
