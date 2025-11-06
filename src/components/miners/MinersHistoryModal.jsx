import React from "react";

export default function MinersHistoryModal({ onClose }) {
  const history = [
    {
      type: "Maintenance",
      desc: "Routine cleaning and thermal paste replacement",
      date: "2024-01-20 11:32 am",
    },
    {
      type: "Performance Alert",
      desc: "Temperature exceeded 70°C threshold",
      date: "2024-01-20 11:32 am",
    },
    {
      type: "Firmware Update",
      desc: "Update to firmware version 2023.12.15",
      date: "2024-01-20 11:32 am",
    },
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-96 max-h-[400px] overflow-y-auto p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Miner History</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {history.map((item, i) => (
          <div key={i} className="border rounded-lg p-3 mb-3">
            <h3 className="font-medium">{item.type}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
            <p className="text-xs text-gray-400 mt-1">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
