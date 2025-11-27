import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import EditMessageModal from "../../components/pending/EditMessageModal";
import { CiCircleCheck, CiClock2 } from "react-icons/ci";
import { RiInformationLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { IoSendOutline } from "react-icons/io5";
import PageHeader from "../../components/PageHeader";

export default function PendingMessages() {
  const [messages, setMessages] = useState(sampleMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState(null);

  // Search bar filtering
  const filtered = messages.filter(
    (msg) =>
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.miner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      <PageHeader
        title="Pending Messages"
        subtitle="Real-time issues across clients and machines"
      />

      <div className="grid grid-cols-3 gap-4 bg-[#F5F5F5] p-6 mt-4 rounded-xl">
        <SummaryCard
          number={countStatus(messages, "Pending")}
          title="Pending Review"
          desc="Awaiting approval"
          icon={<CiClock2 />}
        />

        <SummaryCard
          number={countStatus(messages, "Released")}
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

      {/* SEARCH BAR */}
      <div className="relative mb-5">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search Messages by subject, client or miner..."
          className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* MESSAGES TABLE */}
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 font-semibold bg-white text-gray-700 border-b px-4 py-3">
          <span>Message ID</span>
          <span>Subject</span>
          <span>Client</span>
          <span>Miner</span>
          <span>Status</span>
          <span>Created</span>
          <span>Actions</span>
        </div>

        {filtered.map((m, i) => (
          <div
            key={i}
            className="grid grid-cols-7 items-center text-sm border-b py-3 px-4 bg-blue-50"
          >
            <span>{m.id}</span>

            <span className="font-medium">
              {m.subject}
              <br />
              <span className="text-gray-500 text-xs">{m.preview}</span>
            </span>

            <span>{m.client}</span>
            <span>{m.miner}</span>

            {/* STATUS PILL */}
            <span>
              <span
                className={`px-3 py-1 rounded-full text-white text-xs
                ${m.status === "Pending" ? "bg-gray-600" : "bg-blue-500"}`}
              >
                {m.status}
              </span>
            </span>

            <span>{m.created}</span>

            <div className="flex gap-3 text-lg items-center">
              {/* EDIT BUTTON */}
              <TbEdit
                className="cursor-pointer text-gray-600 hover:text-black h-6 w-6"
                onClick={() => setEditData(m)}
              />
              {/* RELEASE BUTTON */}
              <IoSendOutline className="cursor-pointer text-green-600 hover:text-green-800 h-6 w-6" />
              {/* REJECT BUTTON */}
              <MdClose className="cursor-pointer text-red-600 hover:text-red-800 h-6 w-6" />
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editData && <EditMessageModal record={editData} onClose={() => setEditData(null)} />}
    </div>
  );
}

// SUMMARY CARD COMPONENT
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

const countStatus = (arr, status) => arr.filter((x) => x.status === status).length;

// SAMPLE FAKE DATA
const sampleMessages = [
  {
    id: "MSG-001",
    subject: "Miner Status Update",
    preview: "Your miner has gone offline...",
    client: "Client 001",
    miner: "Antminer S19 Pro #1",
    status: "Pending",
    created: "2025-09-15 10:30",
  },
  {
    id: "MSG-002",
    subject: "Repair Required",
    preview: "Your miner has gone offline...",
    client: "Client 001",
    miner: "Antminer S19 Pro #1",
    status: "Released",
    created: "2025-09-15 10:30",
  },
  {
    id: "MSG-003",
    subject: "Miner Back Online",
    preview: "Your miner has gone offline...",
    client: "Client 001",
    miner: "Antminer S19 Pro #1",
    status: "Released",
    created: "2025-09-15 10:30",
  },
  {
    id: "MSG-004",
    subject: "Warranty Claim Approved",
    preview: "Your miner has gone offline...",
    client: "Client 001",
    miner: "Antminer S19 Pro #1",
    status: "Released",
    created: "2025-09-15 10:30",
  },
];
