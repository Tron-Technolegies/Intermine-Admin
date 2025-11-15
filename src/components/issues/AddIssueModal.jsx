import React from "react";
import { IoClose } from "react-icons/io5";

export default function AddIssueModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-2xl p-6 w-[420px] shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">Add New Issue type</h2>
        <p className="text-sm text-gray-500 mb-5">
          Create a new issue type that will appear in the Client report issue dropdown.
        </p>
        <form action="" className="space-y-3 space-x-4 p-2">
          <label htmlFor="">Issue Type</label>
          <input
            type="text"
            placeholder="e.g., Cooling, Maintenance..."
            className="border border-[#787878] rounded w-full p-2"
          />
          <button className="bg-[#2B347A] p-2 rounded text-white text-center w-full mt-4">
            Add Issue Type
          </button>
        </form>
      </div>
    </div>
  );
}
