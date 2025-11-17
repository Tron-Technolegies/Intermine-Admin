import React from "react";
import { IoClose } from "react-icons/io5";

export default function AgreementSendFormModal({ onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Send Mining Agreement</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">
            <IoClose />
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-gray-500 mb-5">
          Send a new mining agreement template to a selected user.
        </p>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Client</label>
            <select className="border border-gray-300 w-full rounded-lg px-3 py-2 text-sm mt-1 focus:ring focus:ring-blue-200 focus:outline-none">
              <option>Client 01</option>
              <option>Client 02</option>
              <option>Client 03</option>
              <option>Client 04</option>
              <option>Client 05</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Agreement Type</label>
            <select className="border border-gray-300 w-full rounded-lg px-3 py-2 text-sm mt-1 focus:ring focus:ring-blue-200 focus:outline-none">
              <option>Purchase Agreement</option>
              <option>Mining Agreement</option>
            </select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button className="px-5 py-2 rounded-lg bg-[#3893D0] text-white text-sm hover:bg-[#2f7aae]">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
