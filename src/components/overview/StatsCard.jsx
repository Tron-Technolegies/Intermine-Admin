import React from "react";

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-[#E9F2FF] p-4 rounded-lg flex items-center justify-between gap-2 min-w-0">
      <div className="min-w-0">
        <p className="text-sm text-black font-medium break-words leading-tight">{title}</p>
        <h2 className="text-2xl font-bold text-black truncate mt-1">{value}</h2>
      </div>
      <div className="text-[#2B347A] text-xl shrink-0">{icon}</div>
    </div>
  );
}
