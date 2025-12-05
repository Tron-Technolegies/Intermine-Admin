import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardChart({ graphData }) {
  const [activeType, setActiveType] = React.useState("users");

  return (
    <div className="bg-[#F9F9FA] rounded-lg shadow-sm border border-gray-100 p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        {/* Toggle Tabs */}
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <span
            className={`cursor-pointer pb-1 ${
              activeType === "users" ? "text-[#2B347A] border-b-2 border-[#2B347A]" : ""
            }`}
            onClick={() => setActiveType("users")}
          >
            Users
          </span>

          <span
            className={`cursor-pointer pb-1 ${
              activeType === "issues" ? "text-[#2B347A] border-b-2 border-[#2B347A]" : ""
            }`}
            onClick={() => setActiveType("issues")}
          >
            Issues
          </span>
        </div>

        <select className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />

          {/* Only show selected metric */}
          {activeType === "users" && (
            <Line type="monotone" dataKey="users" stroke="#2B347A" strokeWidth={2} dot={{ r: 4 }} />
          )}

          {activeType === "issues" && (
            <Line
              type="monotone"
              dataKey="issues"
              stroke="#FF5733"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
