import { Link, useParams } from "react-router-dom";
import { useGetSingleIssue } from "../../hooks/useIssues";
import Loading from "../../components/Loading";
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
import RespondIssueModal from "../../components/issues/RespondIssueModal";
import useIssueActions from "../../hooks/useIssueActions";
import ChatHistoryModal from "../../components/issues/ChatHistoryModal";

export default function IssueSingle() {
  const { id } = useParams();
  const { isError, isLoading, data } = useGetSingleIssue({ id });
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(data?.status || "Pending");
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const { updateStatus, sendReminder } = useIssueActions();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data]);
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : (
    <>
      <Link
        to={"/offline-miners"}
        className="p-2 bg-indigo-500 text-white my-10 rounded-md"
      >
        Go Back
      </Link>
      <div className="bg-[#F9F9F9] border border-[#E6E6E6] mt-10 rounded-2xl px-7 py-7 flex flex-col gap-2 shadow-sm">
        {/* Top: title + status */}
        <div className="flex md:flex-row flex-col-reverse gap-2 md:gap-0 justify-between items-start">
          <div className="flex items-center gap-3">
            <h3 className=" font-semibold text-black">
              {data.issue?.issueType}
            </h3>

            <span
              className={`text-xs  ${
                data.status === "Resolved"
                  ? "bg-green-600"
                  : status === "Warranty"
                  ? "bg-blue-600"
                  : "bg-[#F2D56A]"
              } text-black font-medium px-3 py-1 rounded-full`}
            >
              {data.status}
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Last update: {new Date(data.updatedAt).toLocaleString()}
          </p>
        </div>
        <p className="font-semibold">{data.miner?.model}</p>
        {/* Description */}
        <p className="text-gray-600 text-sm -mt-2">{data.description}</p>

        {/* Client + Created + Serial */}
        <div className="flex md:flex-row flex-col justify-between md:items-center">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <FaUser className="text-gray-500" />
              <span className="font-medium">{data.user?.clientName}</span>
              <span className="text-gray-400 text-xs">
                {data.user?.clientId}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CiClock2 className="text-gray-500 text-lg" />
              Created {new Date(data.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm font-medium text-black">
            <LuCpu className="text-xl" />
            <span>{data.miner?.workerId}</span>
          </div>
        </div>
        {data.user?.watcherLinks?.length > 0 && (
          <div>
            {data.user.watcherLinks.map((item) => (
              <a
                href={item.link}
                className="text-sm text-blue-500 underline w-fit"
                target="_blank"
              >
                Visit <span className="text-lg font-semibold">{item.coin}</span>{" "}
                Watcher Link
              </a>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          {/* Left controls */}
          <div className="flex md:flex-row flex-col justify-between md:items-center gap-3 w-full">
            <div className="flex md:flex-row flex-col gap-3 md:items-center">
              <button
                onClick={() => setOpenResponseModal(true)}
                className="px-4 py-1.5 cursor-pointer text-sm rounded-lg border border-gray-300 text-gray-700"
              >
                Send Response
              </button>
              <div className="flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="Warranty">Warranty</option>
                  <option value="Repair Center">Repair Center</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  onClick={() => updateStatus.mutate({ id: data._id, status })}
                  className="px-4 py-1.5 text-sm cursor-pointer rounded-lg bg-blue-600 text-white"
                >
                  {updateStatus.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex md:flex-row flex-col md:items-center  gap-4">
              {/* Chat History */}
              <button
                onClick={() => setShowChatModal(true)}
                className="bg-gray-200 cursor-pointer w-full md:w-fit px-4 py-2 rounded-full flex items-center gap-1 text-gray-700 justify-center"
              >
                <BiMessageDetail />
                Messages
              </button>
              {data.reminderHistory && (
                <button
                  onClick={handleClickOpen}
                  className="bg-gray-300 md:w-fit w-full self-end p-2 cursor-pointer rounded-full text-sm"
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
              {data?.reminderHistory?.map((item) => (
                <p key={item} className="p-2 shadow w-full">
                  {new Date(item).toLocaleString()}
                </p>
              ))}
              {data?.reminderHistory?.length < 1 && (
                <p className="p-2">No Reminders sent </p>
              )}
              {data.serviceProvider?.trim()?.toLowerCase() === "dahab" && (
                <button
                  onClick={async () => {
                    await sendReminder.mutateAsync({
                      issueId: data._id,
                      issue: data.issue?.issueType,
                      model: data.miner?.model,
                      serviceProvider: data.serviceProvider,
                      serialNumber: data.miner?.serialNumber,
                    });
                    handleClose();
                  }}
                  className="bg-[#3B8BEA] cursor-pointer text-white w-full md:w-fit px-5 py-2 rounded-full flex items-center justify-center gap-1"
                >
                  <AiOutlineWarning className="text-lg" />{" "}
                  {sendReminder.isPending ? "...." : "Remind Dahab"}
                </button>
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
      {openResponseModal && (
        <RespondIssueModal
          issue={data}
          onClose={() => setOpenResponseModal(false)}
        />
      )}
      {showChatModal && (
        <ChatHistoryModal
          issueId={data._id}
          onClose={() => {
            setShowChatModal(false);
          }}
        />
      )}
    </>
  );
}
