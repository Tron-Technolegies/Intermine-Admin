import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function MinersHistoryModal({ minerId, onClose }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["minerHistory", minerId],
    queryFn: async () => {
      // 1) fetch miner (contains issueHistory which may be array of ids)
      const mRes = await api.get(`/api/v1/admin/miner/${minerId}`);
      const miner = mRes.data;

      // 2) if issueHistory is empty or already populated objects, handle both cases
      const rawHistory = miner.issueHistory || [];

      // if already populated objects (not strings), return them directly
      const isPopulated = rawHistory.length > 0 && typeof rawHistory[0] === "object";

      if (isPopulated) {
        return { miner, issues: rawHistory };
      }

      // 3) rawHistory is likely array of ids -> fetch each issue
      if (rawHistory.length === 0) {
        return { miner, issues: [] };
      }

      // map to fetch promises (use admin route)
      const fetches = rawHistory.map((id) =>
        api
          .get(`/api/v1/admin/issue/${id}`)
          .then((r) => {
            // some endpoints wrap result in r.data.issue or r.data
            // return the most useful shape available
            return r.data.issue || r.data || null;
          })
          .catch((err) => {
            console.error("Failed to fetch issue", id, err?.response?.data || err);
            return null; // continue even if one fails
          })
      );

      const issues = await Promise.all(fetches);
      // filter out nulls
      return { miner, issues: issues.filter(Boolean) };
    },
    enabled: !!minerId,
    staleTime: 1000 * 30,
  });

  const miner = data?.miner;
  const issues = data?.issues || [];

  // Close modal on outside click
  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") onClose();
  };

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      id="overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl w-[92%] sm:w-96 max-h-[70vh] overflow-y-auto p-5 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          aria-label="Close history"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="font-semibold text-lg mb-3">Miner History</h2>

        {/* Miner summary (optional) */}
        {miner && (
          <div className="text-sm text-gray-600 mb-3">
            <div className="font-medium">{miner.clientName || miner.client?.clientName}</div>
            <div className="text-xs">
              {miner.serialNumber} • {miner.model}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && <p className="text-center py-4">Loading history...</p>}

        {/* Error */}
        {isError && <p className="text-center text-red-500 py-4">Failed to load miner history.</p>}

        {/* No history */}
        {!isLoading && issues.length === 0 && (
          <p className="text-center py-4 text-gray-500">No history records found.</p>
        )}

        {/* History Records */}
        {!isLoading &&
          issues.map((item) => {
            // defensive field picking — your issue object might have different keys
            const id = item._id || item.id || item;
            const type = item.type || item.issueType || item.issue?.issueType || "Unknown";
            const status = item.status || item.state || "N/A";
            const workerAddress = item.workerAddress || item.workerAddr || item.worker || "-";
            const messages = item.messages || item.notes || [];
            const created = item.createdAt || item.created || item.date || item.timestamp;
            const desc =
              item.description ||
              item.note ||
              (item.messages && item.messages.length ? item.messages[0].text : "") ||
              "";

            return (
              <div key={id} className="border rounded-lg p-3 mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium capitalize">{type}</h3>
                  <span className="text-xs text-gray-500">{status}</span>
                </div>

                {desc && <p className="text-sm text-gray-600 mt-1">{desc}</p>}

                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <div>Worker: {workerAddress}</div>
                  <div>{created ? new Date(created).toLocaleString() : ""}</div>
                </div>

                {messages.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">Messages: {messages.length}</div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
