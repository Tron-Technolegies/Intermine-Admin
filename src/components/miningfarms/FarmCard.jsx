import React, { useState } from "react";
import FarmTable from "./FarmTable";
import { FaChevronDown, FaChevronUp, FaPen } from "react-icons/fa";

export default function FarmCard({ farm }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow p-3 min-w-[350px]">
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">
          {farm.name} ({farm.capacity})
        </p>
        <div className="flex gap-3 text-gray-600">
          <FaPen className="cursor-pointer hover:text-black" />
          <button onClick={() => setOpen(!open)}>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {/* Expandable Miner Table */}
      {open && <FarmTable miners={farm.miners} />}
    </div>
  );
}
