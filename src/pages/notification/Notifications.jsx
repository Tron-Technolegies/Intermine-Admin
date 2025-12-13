import React, { useEffect, useState } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { toast } from "react-toastify";

import useAdminNotifications from "../../hooks/notifications/useAdminNotifications";
import useNotificationActions from "../../hooks/notifications/useNotificationActions";

export default function Notifications() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showUnseen, setShowUnseen] = useState(false);
  const [page, setPage] = useState(1);

  const status = showUnseen ? "UNREAD" : "ALL";

  const { data, isLoading } = useAdminNotifications(
    page,
    debouncedSearch,
    status
  );
  const { markAll, markOne } = useNotificationActions();

  // Wrap mutate with toast feedback
  const handleMarkAll = () => {
    markAll.mutate(undefined, {
      onSuccess: () => toast.success("All notifications marked as seen"),
      onError: (err) =>
        toast.error(
          err?.response?.data?.message || "Failed to mark all as seen"
        ),
    });
  };

  const handleMarkOne = (id) => {
    markOne.mutate(id, {
      onSuccess: () => toast.success("Marked as read"),
      onError: (err) =>
        toast.error(
          err?.response?.data?.message || "Failed to mark notification"
        ),
    });
  };

  const notifications = data?.notifications || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch((prev) => {
        return search;
      });
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Real-time issues across clients and machines"
      />

      <div className="bg-[#F5F5F5] p-6 mt-4 rounded-xl">
        <h2 className="text-xl font-semibold">Machine Problem Alerts</h2>
        <p className="text-gray-500 mb-5">
          Real-time issues across clients and machines
        </p>

        {/* Search + Toggle + Button */}
        <div className="flex items-center gap-4 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by client, SN, worker, problem"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg"
            />
          </div>

          {/* Toggle Unseen */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-12 h-6 rounded-full flex items-center transition ${
                showUnseen ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={() => setShowUnseen(!showUnseen)}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition mx-1 ${
                  showUnseen ? "translate-x-6" : ""
                }`}
              />
            </div>
            <span className="text-gray-600">Show unseen only</span>
          </label>

          {/* Mark all as seen */}
          <button
            onClick={handleMarkAll}
            className="bg-[#707579] text-white px-5 py-2 rounded-lg hover:bg-black"
          >
            Mark all as seen
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading && <p>Loading notifications...</p>}

          {!isLoading && notifications.length === 0 && (
            <p className="text-gray-500">No notifications found.</p>
          )}

          {notifications.map((n) => {
            const isRead = n.status === "read";

            return (
              <div
                key={n._id}
                className="bg-white rounded-lg p-4 shadow flex justify-between items-center border border-gray-200"
              >
                <div>
                  <p className="font-semibold text-gray-900">{n.problem}</p>

                  <p className="text-gray-600 text-sm mt-1">
                    Client:{" "}
                    <span className="font-medium">{n.client?.clientName}</span>
                  </p>

                  <p className="text-gray-600 text-sm">
                    Miner: <span className="font-medium">{n.miner?.model}</span>
                    &nbsp;• Worker ID:{" "}
                    <span className="font-medium">{n.miner?.workerId}</span>
                  </p>

                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* RIGHT SIDE STATUS + BUTTON */}
                <div className="flex flex-col items-end gap-2">
                  {/* Status icon */}
                  {isRead ? (
                    <FaCheckCircle className="text-green-600" size={22} />
                  ) : (
                    <FiBell className="text-red-500" size={22} />
                  )}

                  {/* Mark as Read Button */}
                  {!isRead && (
                    <button
                      onClick={() => handleMarkOne(n._id)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
