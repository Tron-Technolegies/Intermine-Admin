import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { farmStatus } from "../../utils/DropDowns";
import { useUpdateFarmStatus } from "../../hooks/adminFarms/useUpdateFarmStatus";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 500,
  bgcolor: "background.paper",
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function FarmStatusPopup({ open, farm, handleClose }) {
  const [status, setStatus] = useState(farmStatus[0]);
  const [autoActive, setAutoActive] = useState(false);
  const [activationTime, setActivationTime] = useState(null);
  const [inform, setInform] = useState(false);
  const { isPending, mutateAsync } = useUpdateFarmStatus();

  useEffect(() => {
    if (farm && farm.farmStatus) {
      setStatus(farm.farmStatus);
    }
  }, [farm]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      status,
      farmId: farm?._id,
      inform,
      autoActive,
      activationTime,
    };
    await mutateAsync(data);
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Change Farm Status
        </Typography>
        <form
          className="mt-3 flex flex-col gap-2 text-xs font-semibold"
          onSubmit={handleSubmit}
        >
          <label>Status</label>
          <select
            className="p-2 outline-none rounded-md bg-neutral-100 shadow-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {farmStatus.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          {status === "Offline" && (
            <>
              <div className="flex gap-2 items-center mt-1">
                <input
                  type="checkbox"
                  checked={autoActive}
                  onChange={(e) => setAutoActive(e.target.checked)}
                />
                <label>Turn on Automatically</label>
              </div>
            </>
          )}
          {autoActive && (
            <>
              <label>Auto Online Date</label>
              <input
                type="datetime-local"
                value={activationTime}
                onChange={(e) => setActivationTime(e.target.value)}
                className="p-2 rounded-md bg-neutral-100 outline-none"
              />
            </>
          )}
          {(status === "Active" || status === "Offline") && (
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={inform}
                onChange={(e) => setInform(e.target.checked)}
              />
              <label>Inform Client</label>
            </div>
          )}
          <button
            disabled={isPending}
            className="bg-blue-700 text-white rounded-md hover:bg-blue-900 p-2"
          >
            {isPending ? "Updating..." : "Update Status"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
