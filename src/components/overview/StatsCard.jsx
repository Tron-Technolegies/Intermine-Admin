import React from "react";

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-[#E9F2FF] p-4 rounded-lg  flex items-center justify-between">
      <div className="">
        <p className="text-sm text-black font-medium">{title}</p>
        <h2 className="text-2xl font-bold text-black">{value}</h2>
      </div>
      <div className="text-[#2B347A] text-xl">{icon}</div>
    </div>
  );
}
