import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import {
  cancelPendingMessage,
  releasePendingMessage,
} from "../../hooks/useMessageActions";

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

  const countStatus = (status) =>
    messages.filter((x) => x.status === status).length;

  return (
    <div className="w-full">
      <PageHeader
        title="Pending Messages"
        subtitle="Real-time issues across clients and machines"
      />

      {/* Summary */}
      <div className="grid lg:grid-cols-3 gap-4 bg-[#F5F5F5] p-6 mt-4 rounded-xl w-full">
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
        Review messages from Operations. Edit if needed, then release to send to
        clients or reject.
      </p>

      {/* SEARCH */}
      <div className="relative mb-5">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
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
      <TableContainer component={Paper} sx={{ marginTop: 3, maxWidth: "90vw" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Message Id
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Subject
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Client
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Miner
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Created
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#eff6ff" }}>
            {loading ? (
              <p className="text-center py-6 w-full">Loading.....</p>
            ) : (
              messages?.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item._id}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      <span className="font-medium">
                        {item.issueType}
                        <br />
                        <span className="text-gray-500 text-xs">
                          {item.message.slice(0, 30)}...
                        </span>
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item.clientName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item.miner}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs
              ${item.status === "Pending" ? "bg-gray-600" : "bg-blue-500"}`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {new Date(item.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      <div className="flex gap-3 text-lg items-center">
                        <TbEdit
                          className="cursor-pointer text-gray-600 hover:text-black h-6 w-6"
                          onClick={() => setEditData(m)}
                        />

                        <IoSendOutline
                          className="cursor-pointer text-green-600 hover:text-green-800 h-6 w-6"
                          onClick={() =>
                            releasePendingMessage(m).then(fetchMessages)
                          }
                        />

                        <MdClose
                          className="cursor-pointer text-red-600 hover:text-red-800 h-6 w-6"
                          onClick={() =>
                            cancelPendingMessage(m).then(fetchMessages)
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
