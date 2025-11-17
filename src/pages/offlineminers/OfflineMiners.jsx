import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchFilterBar from "../../components/SearchFilterBar";

export default function OfflineMiners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const OfflineStatusDropdown = ({ statusFilter, setStatusFilter }) => {
    return (
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All Status">All Status</option>
        <option value="Offline">Offline</option>
        <option value="Under Warranty">Under Warranty</option>
        <option value="Under Repair">Under Repair</option>
        <option value="Network Issue">Network Issue</option>
        <option value="PSU Issue">PSU Issue</option>
      </select>
    );
  };

  return (
    <div>
      <PageHeader
        title="Offline Miners"
        subtitle="Monitor and manage miners that are currently offline or disconnected."
      />
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        placeholder="Search by Reason, Miner name, or SL No..."
        customDropdown={
          <OfflineStatusDropdown statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        }
      />

      <div className="bg-white mt-4 rounded-xl p-4 shadow-sm border border-gray-200 text-[#616161] overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="text-left text-gray-600 text-sm border-b">
              <th className="py-3 px-2">SL No</th>
              <th className="py-3 px-2">Owner</th>
              <th className="py-3 px-2">Model</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Issue</th>
              <th className="py-3 px-2">Mining Farm</th>
              <th className="py-3 px-2">Provider</th>
              <th className="py-3 px-2">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-sm">
              <td className="py-3 px-2">XXXXXX</td>
              <td className="py-3 px-2">John Doe</td>
              <td className="py-3 px-2">Antminer S19 Pro</td>
              <td className="py-3 px-2">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                  Offline
                </span>
              </td>
              <td className="py-3 px-2">PSU</td>
              <td className="py-3 px-2">Germany</td>
              <td className="py-3 px-2">Dahab Mining</td>
              <td className="py-3 px-2 ">
                Message 1 <span className="text-[10px] pl-2">2 mins ago</span>{" "}
              </td>{" "}
            </tr>

            <tr className="border-b text-sm">
              <td className="py-3 px-2">XXXXXX</td>
              <td className="py-3 px-2">Alice Johnson</td>
              <td className="py-3 px-2">Whatsminer M30S++</td>
              <td className="py-3 px-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                  Under Warranty
                </span>
              </td>
              <td className="py-3 px-2">Hashboard</td>
              <td className="py-3 px-2">Germany</td>
              <td className="py-3 px-2">Dahab Mining</td>
              <td className="py-3 px-2 ">
                Message 1 <span className="text-[10px] pl-2">2 mins ago</span>{" "}
              </td>
            </tr>

            <tr className="text-sm">
              <td className="py-3 px-2">XXXXXX</td>
              <td className="py-3 px-2">John Doe</td>
              <td className="py-3 px-2">Antminer S19 XP</td>
              <td className="py-3 px-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                  Under Repair
                </span>
              </td>
              <td className="py-3 px-2">Controlboard</td>
              <td className="py-3 px-2">Germany</td>
              <td className="py-3 px-2">Dahab Mining</td>
              <td className="py-3 px-2 ">
                Message 1 <span className="text-[10px] pl-2">2 mins ago</span>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
