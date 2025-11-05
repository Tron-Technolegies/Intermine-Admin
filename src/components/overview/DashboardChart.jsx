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

const data = [
  { name: "Jan", users: 45 },
  { name: "Feb", users: 70 },
  { name: "Mar", users: 55 },
  { name: "Apr", users: 95 },
  { name: "May", users: 80 },
  { name: "Jun", users: 120 },
  { name: "Jul", users: 60 },
  { name: "Aug", users: 140 },
  { name: "Sep", users: 100 },
  { name: "Oct", users: 160 },
  { name: "Nov", users: 130 },
  { name: "Dec", users: 180 },
];

export default function DashboardChart() {
  return (
    <div className="bg-[#F9F9FA] rounded-lg shadow-sm border border-gray-100 p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <span className="text-[#2B347A] border-b-2 border-[#2B347A] pb-1">Users</span>
          <span>Issues</span>
        </div>
        <select className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1 focus:outline-none">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#2B347A"
            strokeWidth={2}
            dot={{ r: 4, fill: "#2B347A", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
