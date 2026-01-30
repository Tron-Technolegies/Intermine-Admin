import React, { useState } from "react";
import AddMinerModal from "./AddMinerModal";
import MinerModelPopup from "./MinerModelPopup";

export default function MinersHeader() {
  const [addForm, setAddForm] = useState(false);
  const [modelForm, setModelForm] = useState(false);

  const handleOpen = () => setModelForm(true);
  const handleClose = () => setModelForm(false);

  return (
    <div className="p-6 border-b border-[#DCDCDC] flex md:flex-row flex-col md:items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-black">Miners</h1>
        <p className="text-md text-gray-500">
          Manage all mining equipment and monitor performance
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleOpen()}
          className="bg-[#3893D0] hover:bg-[#2c7cb5] cursor-pointer text-white rounded-xl px-4 py-1 transition-all"
        >
          + Add Miner Model
        </button>

        <button
          onClick={() => setAddForm(true)}
          className="bg-[#3893D0] hover:bg-[#2c7cb5] cursor-pointer text-white rounded-xl px-4 py-1 transition-all"
        >
          + Add Miner
        </button>
      </div>

      {addForm && <AddMinerModal onClose={() => setAddForm(false)} />}
      {modelForm && (
        <MinerModelPopup open={modelForm} handleClose={handleClose} />
      )}
    </div>
  );
}
