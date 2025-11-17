import React from "react";

export default function AgreementStatsCard() {
  const stats = [
    { title: "Total Agreements", value: "3" },
    { title: "Signed Agreements", value: "2", subtitle: "Completed signatures" },
    { title: "Pending Signatures", value: "1", subtitle: "Awaiting signature" },
    { title: "Completion Rate", value: "67%", subtitle: "Signature completion" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-6">
      {stats.map((item, index) => (
        <div key={index} className="bg-[#E9F2FF] rounded-3xl p-5">
          <p className="text-black text-[15px] font-medium">{item.title}</p>
          <p className="text-black text-2xl font-semibold mt-1">{item.value}</p>
          {item.subtitle && <p className="text-[12px] mt-1 text-gray-700">{item.subtitle}</p>}
        </div>
      ))}
    </div>
  );
}
