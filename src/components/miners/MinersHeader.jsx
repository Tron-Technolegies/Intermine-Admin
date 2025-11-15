import React, { useState } from "react";
import AddMinerModal from "./AddMinerModal";

export default function MinersHeader() {
  const [addForm, setAddForm] = useState(false);
  return (
    <div className="p-6 border-b border-[#DCDCDC] flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-black">Miners</h1>
        <p className="text-md text-gray-500">Manage all mining equipment and monitor performance</p>
      </div>

      <button
        onClick={() => setAddForm(true)}
        className="bg-[#3893D0] hover:bg-[#2c7cb5] text-white rounded-xl px-4 py-1 transition-all"
      >
        + Add Miner
      </button>

      {addForm && <AddMinerModal onClose={() => setAddForm(false)} />}
    </div>
  );
}
