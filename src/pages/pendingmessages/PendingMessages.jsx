import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import EditMessageModal from "../../components/pending/EditMessageModal";
import { CiCircleCheck, CiClock2 } from "react-icons/ci";
import { RiInformationLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { IoSendOutline } from "react-icons/io5";
import PageHeader from "../../components/PageHeader";
import api from "../../api/api";
import { toast } from "react-toastify";
import { cancelPendingMessage, releasePendingMessage } from "../../hooks/useMessageActions";

export default function PendingMessages() {
  const [messages, setMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/v1/messages/pending", {
        params: {
          currentPage,
          query: searchTerm,
        },
        withCredentials: true,
      });

      setMessages(res.data.messages);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentPage, searchTerm]);

  const countStatus = (status) => messages.filter((x) => x.status === status).length;

  return (
    <div className="">
      <PageHeader
        title="Pending Messages"
        subtitle="Real-time issues across clients and machines"
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 bg-[#F5F5F5] p-6 mt-4 rounded-xl">
        <SummaryCard
          number={countStatus("Pending")}
          title="Pending Review"
          desc="Awaiting approval"
          icon={<CiClock2 />}
        />

        <SummaryCard
          number={countStatus("Released")}
          title="Released"
          desc="Sent to clients"
          icon={<CiCircleCheck />}
        />

        <SummaryCard
          number={messages.length}
          title="Total Messages"
          desc="All messages"
          icon={<RiInformationLine />}
        />
      </div>

      <p className="font-semibold text-lg mt-6 mb-2">All Messages</p>
      <p className="text-gray-500 mb-4">
        Review messages from Operations. Edit if needed, then release to send to clients or reject.
      </p>

      {/* SEARCH */}
      <div className="relative mb-5">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by subject, client or miner..."
          className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      {/* TABLE WRAPPER FOR RESPONSIVE SCROLL */}
      <div className="border rounded-lg overflow-hidden w-full overflow-x-auto">
        <div className="min-w-[900px]">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-7 font-semibold bg-white text-gray-700 border-b px-4 py-3">
            <span>Message ID</span>
            <span>Subject</span>
            <span>Client</span>
            <span>Miner</span>
            <span>Status</span>
            <span>Created</span>
            <span>Actions</span>
          </div>

          {/* TABLE ROWS */}
          {loading ? (
            <p className="text-center py-6">Loading...</p>
          ) : (
            messages.map((m) => (
              <div
                key={m._id}
                className="grid grid-cols-7 items-center text-sm border-b py-3 px-4 bg-blue-50"
              >
                {/* WRAP LONG ID INTO 2 LINES */}
                <span className="break-all max-w-[110px] text-xs leading-tight">{m._id}</span>

                <span className="font-medium">
                  {m.issueType}
                  <br />
                  <span className="text-gray-500 text-xs">{m.message.slice(0, 30)}...</span>
                </span>

                <span>{m.clientName}</span>
                <span>{m.miner}</span>

                {/* STATUS */}
                <span>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs
              ${m.status === "Pending" ? "bg-gray-600" : "bg-blue-500"}`}
                  >
                    {m.status}
                  </span>
                </span>

                <span className="text-xs sm:text-sm">{new Date(m.createdAt).toLocaleString()}</span>

                {/* ACTIONS */}
                <div className="flex gap-3 text-lg items-center">
                  <TbEdit
                    className="cursor-pointer text-gray-600 hover:text-black h-6 w-6"
                    onClick={() => setEditData(m)}
                  />

                  <IoSendOutline
                    className="cursor-pointer text-green-600 hover:text-green-800 h-6 w-6"
                    onClick={() => releasePendingMessage(m).then(fetchMessages)}
                  />

                  <MdClose
                    className="cursor-pointer text-red-600 hover:text-red-800 h-6 w-6"
                    onClick={() => cancelPendingMessage(m).then(fetchMessages)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-6">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editData && (
        <EditMessageModal
          record={editData}
          onClose={() => {
            setEditData(null);
            fetchMessages();
          }}
        />
      )}
    </div>
  );
}

// Summary Card
function SummaryCard({ number, title, desc, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl flex flex-col justify-between shadow-sm">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">{title}</p>
        <span className="text-xl">{icon}</span>
      </div>

      <p className="text-3xl font-bold mt-3">{number}</p>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}
