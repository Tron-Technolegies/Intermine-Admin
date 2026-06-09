import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { useReportIssue } from "../../hooks/useReportIssue";
import useIssueTypes from "../../hooks/useIssueTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "black",
  maxHeight: 500,
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function ReportIssueModal2({ open, handleClose, currentMiner }) {
  const { isPending, mutateAsync } = useReportIssue();
  const { isLoading: issueLoading, data: issues } = useIssueTypes();
  const [checked, setChecked] = useState(false);
  const [inform, setInform] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.status = checked ? "online" : "offline";
    data.inform = inform ? "inform" : "not-inform";
    data.miner = currentMiner?._id;
    data.user = currentMiner?.client?._id;
    console.log(data);
    await mutateAsync({ data });
    handleClose();
  }
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            aria-label="Close history"
          >
            ✕
          </button>
          <form className="my-5 flex flex-col gap-2" onSubmit={handleSubmit}>
            <label className="text-xs">Client</label>
            <input
              value={currentMiner?.client?.clientName}
              required
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
            />

            <label className="text-xs">Worker Id</label>
            <input
              value={currentMiner?.workerId}
              required
              name="workerAddress"
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
            />
            <label className="text-xs">Miner Details</label>
            <input
              value={currentMiner?.model}
              required
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
            />
            <label className="text-xs">Issue</label>
            <select
              name="issue"
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
              required
            >
              {!issueLoading &&
                issues?.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.issueType}
                  </option>
                ))}
            </select>
            <label className="text-xs">Issue Description</label>
            <textarea
              rows={3}
              name="description"
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
            ></textarea>
            <label className="text-xs">
              {checked ? "Online" : "Offline"}
              <Switch
                checked={checked}
                onChange={handleChange}
                slotProps={{ input: { "aria-label": "controlled" } }}
              />
            </label>
            <label className="text-xs">
              Inform Client
              <Switch
                checked={inform}
                onChange={(e) => setInform(e.target.checked)}
                slotProps={{ input: { "aria-label": "controlled" } }}
              />
            </label>
            <button
              type="submit"
              disabled={isPending}
              className="p-2 rounded-md bg-indigo-700 text-white cursor-pointer"
            >
              {isPending ? "Creating...." : "Create Issue Ticket"}
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

// <div
//   id="overlay"
//   // onClick={handleOutsideClick}
//   className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
// >
//   <div className="bg-white rounded-xl w-[92%] sm:w-96 max-h-[70vh] overflow-y-auto p-5 shadow-xl relative">
//     <button
//       onClick={onClose}
//       className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
//       aria-label="Close history"
//     >
//       ✕
//     </button>
//     <form className="my-5 flex flex-col gap-2" onSubmit={handleSubmit}>
//       <label className="text-xs">Client</label>
//       <input
//         value={currentMiner?.client?.clientName}
//         required
//         className="p-2 rounded-md shadow bg-gray-100 outline-none"
//       />

//       <label className="text-xs">Worker Id</label>
//       <input
//         value={currentMiner?.workerId}
//         required
//         name="workerAddress"
//         className="p-2 rounded-md shadow bg-gray-100 outline-none"
//       />
//       <label className="text-xs">Miner Details</label>
//       <input
//         value={currentMiner?.model}
//         required
//         className="p-2 rounded-md shadow bg-gray-100 outline-none"
//       />
//       <label className="text-xs">Issue</label>
//       <select
//         name="issue"
//         className="p-2 rounded-md shadow bg-gray-100 outline-none"
//         required
//       >
//         {!issueLoading &&
//           issues?.map((x) => (
//             <option key={x._id} value={x._id}>
//               {x.issueType}
//             </option>
//           ))}
//       </select>
//       <label className="text-xs">Issue Description</label>
//       <textarea
//         rows={3}
//         name="description"
//         className="p-2 rounded-md shadow bg-gray-100 outline-none"
//       ></textarea>
//       <label className="text-xs">
//         {checked ? "Online" : "Offline"}
//         <Switch
//           checked={checked}
//           onChange={handleChange}
//           slotProps={{ input: { "aria-label": "controlled" } }}
//         />
//       </label>
//       <label className="text-xs">
//         Inform Client
//         <Switch
//           checked={inform}
//           onChange={(e) => setInform(e.target.checked)}
//           slotProps={{ input: { "aria-label": "controlled" } }}
//         />
//       </label>
//       <button
//         type="submit"
//         disabled={isPending}
//         className="p-2 rounded-md bg-indigo-700 text-white cursor-pointer"
//       >
//         {isPending ? "Creating...." : "Create Issue Ticket"}
//       </button>
//     </form>
//   </div>
// </div>
