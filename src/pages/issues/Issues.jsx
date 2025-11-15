import React, { useState } from "react";
import { FaUser, FaCog } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import PageHeader from "../../components/PageHeader";
import SearchFilterBar from "../../components/SearchFilterBar";
import ReportIssueModal from "../../components/overview/ReportIssueModal";
import AddIssueModal from "../../components/issues/AddIssueModal";
import RespondIssueModal from "../../components/issues/RespondIssueModal";
import IssueCard from "../../components/issues/IssueCard";

export default function Issues() {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [showRemindSuccess, setShowRemindSuccess] = useState(false);
  const [showRespondModal, setShowRespondModal] = useState(null);

  const issueTypes = [
    "All",
    "Hardware Failure",
    "Overheating",
    "Network Issues",
    "Power Issues",
    "Performance Issues",
    "Software Issues",
    "Maintenance",
  ];

  const issues = [
    {
      id: 1,
      title: "Miner Overheating",
      description: "ASIC-S19-847 is running at 85°C consistently",
      status: "in-progress",
      user: "John Smith",
      clientId: "Client-001",
      serial: "SN: XXXXXXX",
      created: "2024-01-15 • 14:30",
      lastUpdate: "2 min ago",
      type: "Overheating",
    },
    {
      id: 2,
      title: "Network Connectivity issues",
      description: "Unable to connect to mining pool, frequent disconnections",
      status: "in-progress",
      user: "John Smith",
      clientId: "Client-002",
      serial: "SN: XXXXXXX",
      created: "2024-01-15 • 14:30",
      lastUpdate: "2 min ago",
      type: "Network Issues",
    },
  ];

  // Handle filter
  const filteredIssues =
    selectedType === "All" ? issues : issues.filter((issue) => issue.type === selectedType);

  // Handle remind popup
  const handleRemind = () => {
    setShowRemindSuccess(true);
    setTimeout(() => setShowRemindSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <PageHeader
        title="Issues"
        subtitle="Track and manage reported issues from users"
        buttonText="Add Issue"
        ModalComponent={AddIssueModal}
      />
      {/* Search Bar */}
      <SearchFilterBar placeholder="Search by Client / Machine / Worker etc..." />
      {/* Dropdown & Title */}
      <div className="flex justify-between items-center px-6 mt-2 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Current Issue types</h3>
          <p className="text-gray-500 text-sm">Available options in user report dropdown</p>
        </div>

        {/* Dropdown */}
        <div className="flex items-center gap-2">
          <button
            className="bg-gray-200 text-gray-800 font-medium px-3 py-2 rounded-lg text-sm flex items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <span className="text-lg font-bold">+</span> Add
          </button>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg text-sm cursor-pointer focus:outline-none"
          >
            {issueTypes.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Issues List */}
      <div className="p-6 space-y-5">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition hover:shadow-sm"
          >
            {/* Left Content */}
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">{issue.title}</h3>
                <span className="text-xs sm:text-sm bg-yellow-100 text-yellow-700 font-medium px-2 py-1 rounded-full">
                  {issue.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{issue.description}</p>

              {/* User Info */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <FaUser className="text-gray-400" />
                  <span>{issue.user}</span>
                  <span className="text-gray-400 text-xs">({issue.clientId})</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCog className="text-gray-400" />
                  <span>{issue.serial}</span>
                </div>
              </div>

              {/* Created Time */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                Created {issue.created}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  onClick={RespondIssueModal}
                >
                  Send Response
                </button>
                <button className="px-4 py-1.5 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
                  Mark Resolved
                </button>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-row sm:flex-col gap-2 self-end sm:self-center">
              <p className="text-xs text-gray-400 sm:text-right mb-1 sm:mb-2">
                Last update: {issue.lastUpdate}
              </p>
              <button
                onClick={handleRemind}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg flex items-center gap-1 justify-center"
              >
                <AiOutlineWarning className="text-lg" /> Remind
              </button>
            </div>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <p className="text-center text-gray-500">No issues found</p>
        )}
      </div>
      {/* Add Issue Modal */}
      {showModal && <ReportIssueModal onClose={() => setShowModal(false)} />}
      {/* Remind Success Popup */}
      {showRemindSuccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-[#001E91] text-white text-center px-8 py-6 rounded-2xl shadow-lg w-[80%] sm:w-[300px]">
            <p className="mb-4 font-medium">Dahab Reminded Successfully</p>
            <button
              onClick={() => setShowRemindSuccess(false)}
              className="bg-[#0099FF] hover:bg-[#0077cc] px-6 py-1.5 rounded-full font-medium"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {showRespondModal && (
        <RespondIssueModal issue={showRespondModal} onClose={() => setShowRespondModal(null)} />
      )}

      <div className="p-6 space-y-5">
        {filteredIssues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onRespond={() => setShowRespondModal(issue)}
            onResolve={() => console.log("Resolved")}
            onRemind={handleRemind}
            onChat={() => console.log("Chat with Dahab")}
          />
        ))}

        {filteredIssues.length === 0 && (
          <p className="text-center text-gray-500">No issues found</p>
        )}
      </div>
    </div>
  );
}
