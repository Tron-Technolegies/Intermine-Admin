import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";

export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnseen, setShowUnseen] = useState(false);

  const data = sampleNotifications
    .filter(
      (item) =>
        item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.worker.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => (showUnseen ? !item.seen : true));

  return (
    <div>
      <PageHeader title="Notifications" subtitle="Real-time issues across clients and machines" />

      {/* Main Card */}
      <div className="bg-[#F5F5F5] p-6 mt-4 rounded-xl">
        <h2 className="text-xl font-semibold">Machine Problem Alerts</h2>
        <p className="text-gray-500 mb-5">Real-time issues across clients and machines</p>

        {/* Search + Toggle + Button */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by Client, SN, worker, or problem"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2">
            <div
              className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition
                ${showUnseen ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => setShowUnseen(!showUnseen)}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition mx-[2px]
                ${showUnseen ? "translate-x-6" : ""}`}
              ></div>
            </div>
            <span className="text-gray-600">Show unseen only</span>
          </label>

          <button className="bg-[#707579] text-white px-5 py-2 rounded-lg hover:bg-black">
            Mark all as seen
          </button>
        </div>

        {/* TABLE */}
        <div className="border border-[#999999] rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-6 bg-white font-semibold border-b py-3 px-4 text-gray-700">
            <span>Seen</span>
            <span>Problem</span>
            <span>Client</span>
            <span>Machine (SN)</span>
            <span>Worker Name</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          {data.map((n, index) => (
            <div
              key={index}
              className={`grid grid-cols-6 px-4 py-4 border-b border-[#999999] items-center text-sm 
              ${n.seen ? "bg-white" : "bg-blue-50"}`}
            >
              <input type="checkbox" defaultChecked={n.seen} />

              <span className="font-medium">
                {n.problem} <br />
                <span className="text-xs text-gray-500">{n.sn}</span>
              </span>

              <span>{n.client}</span>

              <span>
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs 
                  ${n.state === "Open" ? "bg-blue-500" : "bg-gray-600"}`}
                >
                  {n.state}
                </span>
              </span>

              <span>{n.worker}</span>

              <span className="text-gray-600 text-sm">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// SAMPLE DATA (REAL LOOK)
const sampleNotifications = [
  {
    seen: false,
    problem: "ACME Mining GmbH Offline",
    sn: "SN-A1-09X3",
    client: "acme.worker.01",
    worker: "chrissi1212",
    time: "5m ago",
    state: "Open",
  },
  {
    seen: false,
    problem: "ACME Mining GmbH Offline",
    sn: "SN-A1-09X3",
    client: "acme.worker.01",
    worker: "chrissi1212",
    time: "5m ago",
    state: "Open",
  },
  {
    seen: true,
    problem: "ACME Mining GmbH Offline",
    sn: "SN-A1-09X3",
    client: "acme.worker.01",
    worker: "chrissi1212",
    time: "5m ago",
    state: "Resolved",
  },
  {
    seen: false,
    problem: "ACME Mining GmbH Offline",
    sn: "SN-A1-09X3",
    client: "acme.worker.01",
    worker: "chrissi1212",
    time: "5m ago",
    state: "Open",
  },
  {
    seen: false,
    problem: "ACME Mining GmbH Offline",
    sn: "SN-A1-09X3",
    client: "acme.worker.01",
    worker: "chrissi1212",
    time: "5m ago",
    state: "Open",
  },
  {
    seen: true,
    problem: "ACME Mining GmbH Offline",
    sn: "SN-A1-09X3",
    client: "acme.worker.01",
    worker: "chrissi1212",
    time: "5m ago",
    state: "Resolved",
  },
];
