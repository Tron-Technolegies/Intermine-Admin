import React from "react";
import { IoClose } from "react-icons/io5";

export default function RespondIssueModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-2xl p-6 w-[420px] shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">Respond to issue</h2>
        <p className="text-sm text-gray-500 mb-5">
          Send a response to john doe regarding issue: Miner overheating{" "}
        </p>
        <form action="" className="space-y-3 space-x-4 p-2">
          <label htmlFor="">Your Response</label>
          <textarea
            type="text"
            placeholder="Type your response to the client..."
            className="border border-[#787878] rounded w-full p-2"
          />
          <button className="bg-[#2B347A] p-2 rounded text-white text-center w-full mt-4">
            Send Response
          </button>
        </form>
      </div>
    </div>
  );
}
