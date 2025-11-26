export default function FarmTable({ farm }) {
  const totalUsed = farm.miners.reduce((sum, m) => sum + m.kWh, 0);
  const capacityNum = parseInt(farm.capacity.replace("KWH", "").trim()) || 0;
  const remaining = (capacityNum - totalUsed).toFixed(4);

  return (
    <div className="bg-white rounded-xl shadow border my-6 overflow-hidden">
      {/* FARM TITLE */}
      <div className="text-center font-semibold text-lg py-3 border-b bg-white">
        {farm.name} ({farm.capacity})
      </div>

      {/* TABLE */}
      <table className="w-full text-center text-[14px]">
        <thead className="bg-[#F5F5F5] font-semibold">
          <tr className="border-b">
            <th className="p-2">Count</th>
            <th className="p-2">Miner Model</th>
            <th className="p-2">Sl. No</th>
            <th className="p-2">Mac Address</th>
            <th className="p-2">Worker ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Note</th>
            <th className="p-2">kWh</th>
          </tr>
        </thead>

        <tbody>
          {farm.miners.map((item, i) => (
            <tr key={i} className="border-b hover:bg-[#FAFAFA]">
              <td className="p-2">{item.count}</td>
              <td className="p-2">{item.model}</td>
              <td className="p-2">{item.sl}</td>
              <td className="p-2">{item.mac}</td>
              <td className="p-2">{item.worker}</td>
              <td className="p-2">
                <span
                  className={`
                  px-3 py-1 rounded-full text-white text-xs 
                  ${item.status === "Running" ? "bg-green-500" : "bg-red-500"}
                `}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-2">{item.note || "-"}</td>
              <td className="p-2">{item.kWh}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* STATS FOOTER */}
      <div className="bg-[#EAF4FF] w-full text-[15px]">
        <div className="flex justify-between px-6 py-3 font-medium border-b border-blue-200">
          <span>Total Power Used</span> <span>{totalUsed.toFixed(4)}</span>
        </div>
        <div className="flex justify-between px-6 py-3 font-medium">
          <span>Power Remaining</span> <span>{remaining}</span>
        </div>
      </div>
    </div>
  );
}
