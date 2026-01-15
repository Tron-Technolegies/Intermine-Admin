import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaTools,
  FaClock,
  FaBolt,
  FaBitcoin,
} from "react-icons/fa";
import useClientDetails from "../../hooks/useClientDetails";
import { BiChip } from "react-icons/bi";
import { LuQrCode } from "react-icons/lu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAddInternalNote, useClearNotes } from "../../hooks/useAddNote";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const getStatusColor = (status) => {
  switch (status) {
    case "online":
      return "bg-green-500 text-white";
    case "Warning":
      return "bg-yellow-500 text-white";
    case "offline":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function ClientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNote("");
  };

  const [expandedMiner, setExpandedMiner] = useState(null);
  const toggleMiner = (m) => setExpandedMiner(expandedMiner === m ? null : m);

  const { data: client, isLoading, error } = useClientDetails(id);
  const { isPending, mutate: addNote } = useAddInternalNote();
  const { isPending: clearPending, mutate: clearNotes } = useClearNotes();

  if (isLoading) return <div className="p-6">Loading client...</div>;
  if (error)
    return <div className="p-6 text-red-500">Failed to load client</div>;

  return (
    <div className="p-6 min-h-screen bg-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-gray-600"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-semibold">{client.clientName}</h1>
      <p className="text-gray-500 mb-4">{client.email}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatBox label="Total Miners" value={client.owned?.length || 0} />
        <StatBox
          label="Online"
          value={client.owned?.filter((m) => m.status === "online").length}
        />
        <StatBox
          label="In Repair"
          value={client.owned?.filter((m) => m.status === "offline").length}
        />
        <StatBox
          label="In Warranty"
          value={client.owned?.filter((m) => m.warranty).length}
        />
      </div>

      <div className="bg-gray-100 p-4 flex flex-col gap-2 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Internal Notes</h2>
        <button
          onClick={handleOpen}
          className="p-2 bg-indigo-500 text-white rounded-md w-fit ms-auto cursor-pointer"
        >
          Add Note
        </button>
        {client.internalNote?.length > 0 ? (
          client.internalNote.map((item) => (
            <p className="text-sm text-gray-700" key={item}>
              {item}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-700">No Notes</p>
        )}
        {client.internalNote?.length > 0 && (
          <button
            onClick={() => {
              clearNotes({ user: client?._id });
            }}
            disabled={clearPending}
            className="text-sm cursor-pointer w-fit p-2 bg-red-500 text-white rounded-md"
          >
            {clearPending ? "Clearing..." : "Clear Notes"}
          </button>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-col gap-2">
        <h2 className="font-semibold mb-2">Watcher Links</h2>
        {client.watcherLinks?.length > 0 &&
          client.watcherLinks?.map((item) => (
            <a
              href={item.link}
              className="text-sm text-blue-500 underline w-fit"
              target="_blank"
            >
              Visit <span className="text-lg font-semibold">{item.coin}</span>{" "}
              Watcher Link
            </a>
          ))}
        {client.watcherLinks?.length < 1 && (
          <p className="text-sm">No watcher links assigned</p>
        )}
      </div>

      <h2 className="text-lg font-semibold mb-3">Miners</h2>

      {client.owned?.length ? (
        client.owned.map((miner) => (
          <div key={miner._id} className="shadow-lg rounded-lg mb-3">
            <div
              onClick={() => toggleMiner(miner._id)}
              className="p-3 flex justify-between items-center cursor-pointer"
            >
              <div className="flex flex-col gap-2">
                <p className="text-xl">{miner.model}</p>
                <p className="font-medium">SN: {miner.serialNumber}</p>
                <p className="text-xs text-gray-500">
                  {miner.workerId || "Worker Not Assigned"}
                </p>
              </div>

              {expandedMiner === miner._id ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>

            {expandedMiner === miner._id && (
              <div className="p-3 bg-gray-50">
                <div
                  className={`${getStatusColor(
                    miner.status
                  )} px-3 py-1 rounded-full w-fit text-sm font-medium whitespace-nowrap`}
                >
                  {miner.status === "online"
                    ? "Online"
                    : miner.status === "offline"
                    ? "Offline"
                    : "In Transit"}
                </div>
                <div className="flex justify-between md:flex-row flex-col md:justify-start gap-5 md:gap-16 py-4 border-t border-b border-gray-100 mb-4">
                  {/* Hashrate */}
                  <div className="flex items-center gap-2">
                    <BiChip size={20} />
                    <div>
                      <div className="text-lg font-semibold">
                        {miner.hashRate}
                      </div>
                      <div className="text-xs text-gray-500">Hash Rate</div>
                    </div>
                  </div>

                  {/* Power */}
                  <div className="flex items-center gap-2">
                    <FaBolt size={20} />
                    <div>
                      <div className="text-lg font-semibold">
                        {miner.power}W
                      </div>
                      <div className="text-xs text-gray-500">Power</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuQrCode size={20} />
                    <div>
                      <div className="text-lg font-semibold">
                        {miner.poolAddress}
                      </div>
                      <div className="text-xs text-gray-500">Pool Address</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBitcoin size={20} />
                    <div>
                      <div className="text-lg font-semibold">{miner.coins}</div>
                      <div className="text-xs text-gray-500">Coins</div>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/miners/${miner._id}`}
                  className="bg-indigo-600 text-white p-2 rounded-md"
                >
                  View Full Details
                </Link>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No miners linked to this client</p>
      )}
      {/* Add Note Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-center text-sm font-semibold">Add Internal Note</p>
          <textarea
            className="p-2 bg-gray-200 rounded-md"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter note"
          />
          <button
            onClick={() => {
              addNote({ user: client?._id, note });
              handleClose();
            }}
            disabled={isPending}
            className="p-2  bg-indigo-500 text-white rounded-md cursor-pointer"
          >
            Add Note
          </button>
        </Box>
      </Modal>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-gray-100 text-center p-4 rounded-xl">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}
