import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleIssue } from "../../hooks/useIssues";
import Loading from "../../components/Loading";
import { FaUser } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { LuCpu } from "react-icons/lu";
import { BiMessageDetail } from "react-icons/bi";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ChatHistoryModal from "../../components/issues/ChatHistoryModal";
import RespondIssueModal from "../../components/issues/RespondIssueModal";
import { AiOutlineWarning } from "react-icons/ai";
import useIssueActions from "../../hooks/useIssueActions";
import { MdHistory } from "react-icons/md";
import StatusHistoryModal from "../../components/issues/StatusHistoryModal";

export default function SingleMinerIssue() {
  const { id } = useParams();
  const { isError, isLoading, data } = useGetSingleIssue({ id });
  const [open, setOpen] = useState(false);
  const [openStatusHistory, setOpenStatusHistory] = useState(false);
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : (
    <>
      <Link
        to={`/miners/${data?.miner?._id}`}
        className="p-2 bg-indigo-500 text-white my-10 rounded-md"
      >
        Go Back
      </Link>
      <div className="bg-[#F9F9F9] border border-[#E6E6E6] mt-10 rounded-2xl px-7 py-7 flex flex-col gap-2 shadow-sm">
        <p className="font-bold text-sm">ID: XXX-{data._id.slice(15)}</p>
        {/* Top: title + status */}
        <div className="flex md:flex-row flex-col-reverse gap-2 md:gap-0 justify-between items-start">
          <div className="flex flex-col gap-1 w-full">
            {data.type === "repair" ? (
              <h3 className=" font-semibold text-lg text-black">
                {data.issue?.issueType}
              </h3>
            ) : (
              <p className="font-semibold text-blue-700">
                Request for Pool Change
              </p>
            )}
            {/* Description */}
            <p className="text-gray-600 text-sm">{data.description}</p>
          </div>

          <p className="text-xs flex flex-col items-end w-full gap-2 text-gray-500">
            <div className="flex gap-3 items-center">
              <p
                className={`text-xs w-fit self-end  ${
                  data.status === "Resolved"
                    ? "bg-green-600"
                    : data.status === "Warranty"
                      ? "bg-blue-600"
                      : "bg-[#F2D56A]"
                } text-black font-medium px-3 py-1 rounded-full`}
              >
                {data.status}
              </p>
              <MdHistory
                size={24}
                className="cursor-pointer"
                onClick={() => setOpenStatusHistory(true)}
              />
            </div>
            Last update: {new Date(data.updatedAt).toLocaleString()}
          </p>
        </div>
        <p className="font-medium">{`${data.miner?.manufacturer} ${data.miner?.model} (${data.miner?.hashRate} TH/s)`}</p>
        <p className="font-medium">SI NO: {data.miner?.serialNumber}</p>
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
              Created {new Date(data.createdAt).toLocaleString()} by{" "}
              {data.statusHistory[0]?.changedBy}
            </div>
            {data.resolvedOn && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CiClock2 className="text-gray-500 text-lg" />
                Resolved {new Date(data.resolvedOn).toLocaleString()}
              </div>
            )}
          </div>

          {data.type === "change" && (
            <div className=" flex flex-col gap-2 mb-2">
              <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm text-gray-500">
                Current Worker ID:
                <span className="text-blue-700 font-semibold">
                  {data.miner?.workerId}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm text-gray-500">
                Requested Worker ID:
                <span className="text-blue-700 font-semibold">
                  {data.changeRequest?.worker}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm text-gray-500">
                Requested Pool Address:
                <span className="text-blue-700 font-semibold">
                  {data.changeRequest?.pool}
                </span>
              </div>
            </div>
          )}

          {data.type === "repair" && (
            <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm font-medium text-black">
              <LuCpu className="text-xl" />
              <span>{data.miner?.workerId}</span>
            </div>
          )}
        </div>

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
              {data.serviceProvider?.toLowerCase() === "dahab miners" && (
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
      <StatusHistoryModal
        open={openStatusHistory}
        handleClose={() => setOpenStatusHistory(false)}
        statusHistory={data.statusHistory}
      />
    </>
  );
}
