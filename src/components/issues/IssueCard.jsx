import React from "react";
import { FaUser } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { LuCpu } from "react-icons/lu";
import { AiOutlineWarning } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";

export default function IssueCard({ issue, onRespond, onResolve, onRemind, onChat }) {
  return (
    <div className="bg-[#F9F9F9] border border-[#E6E6E6] rounded-2xl px-7 py-7 flex flex-col gap-5 shadow-sm">
      {/* Top: Title + Status + Last Update */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-black">{issue.title}</h3>

          <span className="text-xs bg-[#F2D56A] text-black font-medium px-3 py-1 rounded-full">
            {issue.status}
          </span>
        </div>

        <p className="text-xs text-gray-500">Last update: {issue.lastUpdate}</p>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm -mt-2">{issue.description}</p>

      {/* Middle row: user + created + serial */}
      <div className="flex flex-wrap justify-between  items-center">
        {/* Left side */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <FaUser className="text-gray-500" />
            <span className="font-medium">{issue.user}</span>
            <span className="text-gray-400 text-xs">{issue.clientId}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CiClock2 className="text-gray-500 text-lg" />
            Created {issue.created}
          </div>
        </div>

        {/* Right side: serial */}
        <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm font-medium text-black">
          <LuCpu className="text-xl" />
          <span>{issue.serial}</span>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-between items-center mt-3 flex-wrap gap-3">
        {/* Left Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRespond}
            className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Send Response
          </button>

          <button
            onClick={onResolve}
            className="px-4 py-1.5 text-sm rounded-lg bg-[#4CAF50] text-white hover:bg-green-600 transition"
          >
            Mark Resolved
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onChat}
            className="bg-[#3B8BEA] hover:bg-[#1B6FCC] text-white text-sm px-5 py-2 rounded-full flex items-center gap-1"
          >
            <MdChatBubbleOutline className="text-lg" /> Dahab
          </button>

          <button
            onClick={onRemind}
            className="bg-[#3B8BEA] hover:bg-[#1B6FCC] text-white text-sm px-5 py-2 rounded-full flex items-center gap-1"
          >
            <AiOutlineWarning className="text-lg" /> Remind
          </button>
        </div>
      </div>
    </div>
  );
}
