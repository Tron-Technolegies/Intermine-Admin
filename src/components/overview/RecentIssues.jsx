import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { LuAlarmClock } from "react-icons/lu";

const issues = [
  { name: "John Smith", issue: "Overheating", id: "ASIC-S19-847", time: "2 min ago" },
  { name: "Sarah Jonson", issue: "Network issue", id: "ASIC-S19-847", time: "5 min ago" },
  { name: "John Smith", issue: "Overheating", id: "ASIC-S19-847", time: "7 min ago" },
];

export default function RecentIssues() {
  return (
    <div className="bg-[#F7F8F9] border border-gray-100 rounded-lg p-4 flex-1 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 flex text-lg items-center gap-2">
          <span className="text-yellow-500">
            <FiAlertTriangle />
          </span>{" "}
          Recent Issues
        </h3>
        <button className="text-sm text-white bg-[#787878] font-medium border border-gray-300 rounded-xl px-2 py-2 hover:bg-[#787878]">
          Report an Issue
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">Latest reported issues that need attention</p>

      <div className="space-y-2">
        {issues.map((item, index) => (
          <div
            key={index}
            className=" bg-white border border-gray-100 rounded-md px-3 py-2 flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-gray-500">{item.issue}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 border border-gray-300 px-2 py-1 rounded-2xl">
                {item.id}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <LuAlarmClock />
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-right text-sm text-blue-600 mt-2 hover:underline cursor-pointer">
        View all
      </p>
    </div>
  );
}
