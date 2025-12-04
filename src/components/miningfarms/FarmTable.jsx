export default function FarmTable({ miners = [], isLoading, page, totalPages, setPage }) {
  if (isLoading) return <p className="text-center mt-4">Loading miners...</p>;

  if (!miners || miners.length === 0)
    return <p className="text-center mt-4 text-gray-500">No miners found</p>;

  // Calculate power usage
  const totalUsed = miners.reduce((sum, m) => sum + (m.power || 0), 0);

  return (
    <div className="bg-white rounded-xl shadow border my-6 overflow-hidden">
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
            <th className="p-2">kWh</th>
          </tr>
        </thead>

        <tbody>
          {miners.map((item, i) => (
            <tr key={item._id || i} className="border-b hover:bg-[#FAFAFA]">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{item.model}</td>
              <td className="p-2">{item.serialNumber}</td>
              <td className="p-2">{item.macAddress}</td>
              <td className="p-2">{item.workerId}</td>

              <td className="p-2">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${
                    item.status === "online" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-2">{item.power}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* POWER STATS */}
      <div className="bg-[#EAF4FF] w-full text-[15px]">
        <div className="flex justify-between px-6 py-3 font-medium border-b border-blue-200">
          <span>Total Power Used</span> <span>{totalUsed}</span>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 py-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-medium">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
