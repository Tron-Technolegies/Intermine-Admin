import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { LuCpu } from "react-icons/lu";
import { AiOutlineWarning } from "react-icons/ai";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BiMessageDetail } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import StatusHistoryModal from "./StatusHistoryModal";
import { useGetRepairAndWarrantyFarms } from "../../hooks/adminFarms/useFarms";

export default function IssueCard({
  issue,
  onRespond,
  onStatusUpdate,
  onChatOpen,
  onReminder,
}) {
  const [status, setStatus] = useState(issue.status);
  const [saving, setSaving] = useState(false);
  const [provider, setProvider] = useState(issue?.serviceProvider || "");
  const [currentLocation, setCurrentLocation] = useState(
    issue.currentLocation || null,
  );
  const [open, setOpen] = useState(false);
  const [openStatusHistory, setOpenStatusHistory] = useState(false);
  const { isLoading, data } = useGetRepairAndWarrantyFarms();

  const handleSave = async () => {
    setSaving(true);
    try {
      await onStatusUpdate(
        issue._id,
        status,
        issue.miner?.serviceProvider,
        currentLocation,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (issue) {
      setProvider(issue.serviceProvider);
    }
  }, [issue]);
  return (
    <div className="bg-[#F9F9F9] border border-[#E6E6E6] rounded-2xl px-7 py-7 flex flex-col gap-2 shadow-sm overflow-hidden">
      <p className="font-bold text-sm">ID: XXX-{issue._id.slice(15)}</p>
      {/* Top: title + status */}
      <div className="flex md:flex-row flex-col-reverse gap-2 md:gap-0 justify-between items-start min-w-0">
        <div className="flex flex-col gap-2 w-full min-w-0">
          {issue.type === "repair" ? (
            <h3 className=" font-semibold text-black">
              {issue.issue?.issueType}
            </h3>
          ) : (
            <p className="font-semibold text-blue-700">
              Request for Pool Change
            </p>
          )}
          {/* Description */}
          <p className="text-gray-600 text-sm -mt-2 break-words whitespace-normal">
            {issue.description}
          </p>
        </div>

        <div className="text-xs flex flex-col items-start md:items-end w-full md:w-auto gap-2 text-gray-500 shrink-0">
          <div className="flex gap-3 items-center md:self-end">
            <span
              className={`text-xs w-fit ${
                issue.status === "Resolved"
                  ? "bg-green-600"
                  : issue.status === "Warranty"
                    ? "bg-blue-600"
                    : "bg-[#F2D56A]"
              } text-black font-medium px-3 py-1 rounded-full`}
            >
              {issue.status}
            </span>
            <MdHistory
              size={24}
              className="cursor-pointer"
              onClick={() => setOpenStatusHistory(true)}
            />
          </div>
          <span>Last update: {new Date(issue.updatedAt).toLocaleString()}</span>
        </div>
      </div>
      <p
        className="font-semibold break-words whitespace-normal min-w-0 max-w-full"
        style={{ overflowWrap: "anywhere", wordBreak: "break-all" }}
      >
        {issue.miner?.model} (SI No: {issue.miner?.serialNumber})
      </p>

      {/* Client + Created + Serial */}
      <div className="flex md:flex-row flex-col justify-between md:items-center min-w-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <FaUser className="text-gray-500" />
            <span className="font-medium">{issue.user?.clientName}</span>
            <span className="text-gray-400 text-xs">
              {issue.user?.clientId}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CiClock2 className="text-gray-500 text-lg" />
            Created {new Date(issue.createdAt).toLocaleString()} by{" "}
            {issue?.statusHistory[0]?.changedBy}
          </div>
          {issue.resolvedOn && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CiClock2 className="text-gray-500 text-lg" />
              Resolved {new Date(issue.resolvedOn).toLocaleString()}
            </div>
          )}
        </div>

        {issue.type === "change" && (
          <div className="flex flex-col gap-2 mb-2 min-w-0 max-w-full">
            <div className="flex flex-wrap items-start gap-2 mt-3 sm:mt-0 text-sm text-gray-500 min-w-0 w-full">
              <span className="min-w-0">Current Worker ID:</span>
              <span
                className="text-blue-700 font-semibold break-words whitespace-normal min-w-0 w-full"
                style={{ overflowWrap: "anywhere", wordBreak: "break-all" }}
              >
                {issue.miner?.workerId}
              </span>
            </div>
            <div className="flex flex-wrap items-start gap-2 mt-3 sm:mt-0 text-sm text-gray-500 min-w-0 w-full">
              <span className="min-w-0">Requested Worker ID:</span>
              <span
                className="text-blue-700 font-semibold break-words whitespace-normal min-w-0 w-full"
                style={{ overflowWrap: "anywhere", wordBreak: "break-all" }}
              >
                {issue.changeRequest?.worker}
              </span>
            </div>
            <div className="flex flex-wrap items-start gap-2 mt-3 sm:mt-0 text-sm text-gray-500 min-w-0 w-full">
              <span className="min-w-0">Requested Pool Address:</span>
              <span
                className="text-blue-700 font-semibold break-words whitespace-normal min-w-0 w-full"
                style={{ overflowWrap: "anywhere", wordBreak: "break-all" }}
              >
                {issue.changeRequest?.pool}
              </span>
            </div>
          </div>
        )}

        {issue.type === "repair" && (
          <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0 text-sm font-medium text-black min-w-0 w-full">
            <LuCpu className="text-xl" />
            <span
              className="break-words whitespace-normal min-w-0 w-full"
              style={{ overflowWrap: "anywhere", wordBreak: "break-all" }}
            >
              {issue.miner?.workerId}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        {/* Left controls */}
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-3 w-full">
          <div className="flex md:flex-row flex-col gap-3 md:items-center w-full md:w-auto">
            <button
              onClick={onRespond}
              className="px-4 py-1.5 text-sm rounded-lg cursor-pointer border border-gray-300 text-gray-700 w-full sm:w-auto text-center"
            >
              Send Response
            </button>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 w-full sm:w-auto"
              >
                <option value="Pending">Pending</option>
                {issue.type === "repair" && (
                  <option value="Warranty">Warranty</option>
                )}
                {issue.type === "repair" && (
                  <option value="Repair Center">Repair Center</option>
                )}
                {issue.type === "change" && (
                  <option value={"Cancelled"}>Cancelled</option>
                )}
                <option value="Resolved">Resolved</option>
              </select>
              {!isLoading &&
                data &&
                (status === "Warranty" || status === "Repair Center") && (
                  <select
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 w-full sm:w-auto"
                    required
                  >
                    <option value={""}>Choose Location</option>
                    {data
                      .filter((item) => item.serviceProvider === provider)
                      .map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.farm}
                        </option>
                      ))}
                  </select>
                )}
              <button
                onClick={handleSave}
                className="px-4 py-1.5 text-sm cursor-pointer rounded-lg bg-blue-600 text-white w-full sm:w-auto text-center"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex md:flex-row flex-col md:items-center gap-4 w-full md:w-auto">
            {/* Chat History */}
            <button
              onClick={() => onChatOpen(issue._id)}
              className="bg-gray-200 cursor-pointer w-full md:w-fit px-4 py-2 rounded-full flex items-center gap-1 text-gray-700 justify-center"
            >
              <BiMessageDetail />
              Messages
            </button>
            {issue.reminderHistory && (
              <button
                onClick={handleClickOpen}
                className="bg-gray-300 w-full md:w-fit p-2 cursor-pointer rounded-full text-sm text-center flex justify-center items-center"
              >
                Remind Service Provider
              </button>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"All Reminders"}</DialogTitle>
        <DialogContent style={{ minWidth: 300 }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {issue?.reminderHistory?.map((item) => (
              <p key={item} className="p-2 text-sm shadow w-full">
                Reminded on {new Date(item).toLocaleString()}
              </p>
            ))}
            {issue?.reminderHistory?.length < 1 && (
              <p className="p-2">No Reminders sent </p>
            )}
            {issue.miner?.serviceProvider?.toLowerCase() === "dahab" && (
              <button
                onClick={() => {
                  onReminder(issue._id);
                  handleClose();
                }}
                className="bg-[#3B8BEA] cursor-pointer text-white w-full md:w-fit px-5 py-2 rounded-full flex items-center justify-center gap-1"
              >
                <AiOutlineWarning className="text-lg" /> Remind Dahab
              </button>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <StatusHistoryModal
        open={openStatusHistory}
        handleClose={() => setOpenStatusHistory(false)}
        statusHistory={issue.statusHistory}
      />
    </div>
  );
}
