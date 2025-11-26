import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function AddFarmModal({ onClose, setFarms }) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const addFarm = () => {
    setFarms((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: name,
        capacity: capacity,
        miners: [],
      },
    ]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[350px] relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <IoClose size={22} />
        </button>
        <p className="text-xl font-semibold mb-3">Add Farm</p>
        <input
          type="text"
          placeholder="Farm Name"
          className="border rounded w-full p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Capacity (eg: 70KWH)"
          className="border rounded w-full p-2 mb-4"
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button onClick={addFarm} className="w-full bg-[#2B347A] text-white p-2 rounded-lg">
          Add Farm
        </button>
      </div>
    </div>
  );
}
