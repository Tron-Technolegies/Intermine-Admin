import React from "react";

export default function AgreementStatsCard({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-6">
      {stats.map((item, i) => (
        <div key={i} className="bg-[#E9F2FF] rounded-3xl p-5">
          <p className="text-black text-[15px] font-medium">{item.title}</p>
          <p className="text-black text-2xl font-semibold mt-1">{item.value}</p>
          {item.subtitle && <p className="text-[12px] mt-1 text-gray-700">{item.subtitle}</p>}
        </div>
      ))}
    </div>
  );
}
