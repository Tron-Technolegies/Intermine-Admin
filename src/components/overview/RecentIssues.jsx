import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { LuAlarmClock } from "react-icons/lu";
import useOverviewActions from "../../hooks/useOverviewActions";
import { Link } from "react-router-dom";
import ReportIssueModal from "../overview/ReportIssueModal";

export default function RecentIssues() {
  const { issues = [], isLoading } = useOverviewActions();
  const [showReportModal, setShowReportModal] = useState(false);

  if (isLoading) return <p>Loading issues...</p>;

  const timeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const diffMs = Date.now() - date;
    const minutes = Math.floor(diffMs / 60000);

    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hr ago`;
  };

  return (
    <div className="bg-[#F7F8F9] border border-gray-100 rounded-lg p-4 flex-1 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
          <span className="text-yellow-500">
            <FiAlertTriangle />
          </span>
          Recent Issues
        </h3>

        <button
          className="text-sm text-white bg-[#787878] font-medium rounded-xl px-2 py-2"
          onClick={() => setShowReportModal(true)}
        >
          Issue Ticket
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        Latest reported issues that need attention
      </p>

      <div className="space-y-2">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white border border-gray-100 rounded-md px-3 py-2 flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium text-gray-800">
                {issue.user?.clientName}
              </p>
              <p className="text-gray-500">{issue.issue?.issueType}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-white px-2 py-1 border border-gray-300 rounded-2xl">
                {issue.miner?.serialNumber}
              </span>

              <span className="text-sm text-gray-400 flex items-center gap-1">
                <LuAlarmClock /> {timeAgo(issue.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link
        to={"/issues"}
        className="text-right text-sm text-blue-600 mt-2 hover:underline cursor-pointer"
      >
        View all
      </Link>

      {/* Modal */}
      {showReportModal && (
        <ReportIssueModal onClose={() => setShowReportModal(false)} />
      )}
    </div>
  );
}
