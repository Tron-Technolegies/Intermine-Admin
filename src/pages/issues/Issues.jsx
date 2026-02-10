import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import IssueCard from "../../components/issues/IssueCard";
import AddIssueModal from "../../components/issues/AddIssueModal";
import RespondIssueModal from "../../components/issues/RespondIssueModal";
import ReportIssueModal from "../../components/overview/ReportIssueModal";

import useIssues from "../../hooks/useIssues";
import useIssueTypes from "../../hooks/useIssueTypes";
import useIssueActions from "../../hooks/useIssueActions";
import ChatHistoryModal from "../../components/issues/ChatHistoryModal";
import SearchFilterBar from "../../components/SearchFilterBar";

export default function Issues() {
  const [selectedType, setSelectedType] = useState("Default");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [editTypeData, setEditTypeData] = useState(null);

  const [showRespondModal, setShowRespondModal] = useState(null);
  const [showRemindSuccess, setShowRemindSuccess] = useState(false);

  // Get issue types
  const { data: issueTypesData } = useIssueTypes();
  const dropdownOptions = [
    "All",
    ...(issueTypesData?.map((t) => t.issueType) || []),
  ];
  const statusOptions = [
    "Default",
    "Pending",
    "Warranty",
    "Repair Center",
    "Resolved",
  ];

  // Fetch issues list
  const { data: issuesData, isLoading } = useIssues(
    selectedType,
    searchTerm,
    page,
  );
  const issues = issuesData?.issues || [];

  // Actions
  const { updateStatus, sendReminder } = useIssueActions();
  const [showChatModal, setShowChatModal] = useState(null);

  // Status update handler
  const handleStatusUpdate = async (id, status) => {
    await updateStatus.mutateAsync({ id, status });
  };

  // Reminder handler
  const handleReminder = async (data) => {
    await sendReminder.mutateAsync({
      issueId: data.id,
      issue: data.issue,
      model: data.model,
      serviceProvider: data.serviceProvider,
      serialNumber: data.serialNumber,
    });

    setShowRemindSuccess(true);
    setTimeout(() => setShowRemindSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageHeader
        title="Issues"
        subtitle="Track and manage reported issues from users"
        buttonText="Issue Ticket"
        ModalComponent={ReportIssueModal}
      />
      <SearchFilterBar
        search={searchTerm}
        onSearch={(value) => setSearchTerm(value)}
        filterValue={selectedType}
        onFilterChange={(value) => setSelectedType(value)}
        filterOptions={statusOptions}
        title="Issues"
        subtitle="Search and filter issues by status"
        placeholder="Search issues..."
      />

      {/* Issue Types */}
      <div className="px-6 mt-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Issue Types</h3>
          <button
            onClick={() => {
              setEditTypeData(null);
              setShowAddTypeModal(true);
            }}
            className="bg-[#2B347A] text-white p-2 rounded-lg"
          >
            + Add Issue Type
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {issueTypesData?.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-md"
            >
              <span className="text-gray-800 text-sm">{item.issueType}</span>
              <button
                onClick={() => {
                  setEditTypeData(item);
                  setShowAddTypeModal(true);
                }}
              >
                ✎
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Issue Cards */}
      <div className="p-6 space-y-5">
        {isLoading && <p className="text-center">Loading issues...</p>}

        {!isLoading &&
          issues.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              onRespond={() => setShowRespondModal(issue)}
              onChatOpen={(id) => setShowChatModal(id)}
              onStatusUpdate={handleStatusUpdate}
              onReminder={() =>
                handleReminder({
                  id: issue._id,
                  issue:
                    issue.type === "repair"
                      ? issue.issue?.issueType
                      : `Request for Pool Change with New Worker Id ${issue.changeRequest?.worker} and new Pool Address ${issue.changeRequest?.pool}`,
                  model: issue.miner?.model,
                  serviceProvider: issue.miner?.serviceProvider,
                  serialNumber: issue.miner?.workerId,
                })
              }
            />
          ))}
        {issues.length < 1 && <p>No Issues Found</p>}
      </div>
      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="py-2">
          Page {page} / {issuesData?.totalPages}
        </span>

        <button
          disabled={page === issuesData?.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
      {/* Respond Modal */}
      {showRespondModal && (
        <RespondIssueModal
          issue={showRespondModal}
          onClose={() => setShowRespondModal(null)}
        />
      )}
      {/* Reminder Popup */}
      {showRemindSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-[#2B347A] text-white px-8 py-6 rounded-xl">
            Dahab Reminded Successfully
          </div>
        </div>
      )}
      {/* Add/Edit Modal */}
      {showAddTypeModal && (
        <AddIssueModal
          onClose={() => setShowAddTypeModal(false)}
          editData={editTypeData}
        />
      )}
      {showChatModal && (
        <ChatHistoryModal
          issueId={showChatModal}
          onClose={() => setShowChatModal(null)}
        />
      )}
    </div>
  );
}
