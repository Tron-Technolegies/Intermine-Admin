import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import useIssueActions from "../../hooks/useIssueActions";

export default function RespondIssueModal({ issue, onClose }) {
  const [message, setMessage] = useState("");

  const { sendResponse } = useIssueActions();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    await sendResponse.mutateAsync({
      issueId: issue._id,
      message,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-2xl p-6 w-[420px] shadow-lg">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <IoClose size={22} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Respond to Issue</h2>

        {/* Dynamic issue info */}
        <p className="text-sm text-gray-500 mb-5">
          Send a response to <strong>{issue.user?.clientName}</strong> regarding:
          <br />
          <span className="font-medium text-gray-800">
            {issue.issue?.issueType || "Unknown Issue"}
          </span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 p-2">
          <label className="text-sm text-gray-700">Your Response</label>

          <textarea
            placeholder="Type your response to the client..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-[#787878] rounded w-full p-2 h-28 resize-none"
          />

          <button
            type="submit"
            disabled={sendResponse.isPending}
            className="bg-[#2B347A] p-2 rounded text-white text-center w-full mt-4"
          >
            {sendResponse.isPending ? "Sending..." : "Send Response"}
          </button>
        </form>
      </div>
    </div>
  );
}
