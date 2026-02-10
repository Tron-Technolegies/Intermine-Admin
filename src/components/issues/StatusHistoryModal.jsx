import React from "react";
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
  maxHeight: 500,
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};
export default function StatusHistoryModal({
  open,
  handleClose,
  statusHistory,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Complete Status History
        </Typography>

        {statusHistory?.map((item) => (
          <div
            key={item.changedOn}
            className="p-2 rounded-md mt-3 shadow-sm text-xs font-semibold flex flex-col gap-2"
          >
            <p>
              Status: <span className="font-normal">{item.status}</span>
            </p>
            <p>
              Changed By: <span className="font-normal">{item.changedBy}</span>
            </p>

            <span className="font-light">
              {new Date(item.changedOn)?.toLocaleDateString("en-us", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        ))}
      </Box>
    </Modal>
  );
}
