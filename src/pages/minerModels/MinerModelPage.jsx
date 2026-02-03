import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import MinerModelPopup from "../../components/miners/MinerModelPopup";
import MinerModelTable from "../../components/minermodels/MinerModelTable";

export default function MinerModelPage() {
  const [modelForm, setModelForm] = useState(false);

  const handleOpen = () => setModelForm(true);
  const handleClose = () => setModelForm(false);
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title={"Miner Models"}
        subtitle={"Add and Manage different models"}
      />
      <button
        onClick={handleOpen}
        className="bg-[#3893D0] w-fit self-end cursor-pointer hover:bg-[#2c7cb5] text-white rounded-xl px-4 py-1 transition-all flex items-center gap-2"
      >
        <span className="text-lg font-bold">+</span>
        Add New
      </button>
      <MinerModelPopup open={modelForm} handleClose={handleClose} />
      <MinerModelTable />
    </div>
  );
}
