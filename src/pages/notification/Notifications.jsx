import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";

import useAdminNotifications from "../../hooks/notifications/useAdminNotifications";
import useNotificationActions from "../../hooks/notifications/useNotificationActions";

export default function Notifications() {
  const [search, setSearch] = useState("");
  const [showUnseen, setShowUnseen] = useState(false);
  const [page, setPage] = useState(1);

  const status = showUnseen ? "UNREAD" : "ALL";

  const { data, isLoading } = useAdminNotifications(page, search, status);
  const { markAll } = useNotificationActions();

  const notifications = data?.notifications || [];
  const totalPages = data?.totalPages || 1;

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
            onClick={() => markAll.mutate()}
            className="bg-[#707579] text-white px-5 py-2 rounded-lg hover:bg-black"
          >
            Mark all as seen
          </button>
        </div>
      </div>
    </div>
  );
}
