import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  maxHeight: 600,
  overflowY: "scroll",
  p: 4,
};

export default function DowntimeHistoryModal({ open, handleClose, farm }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Downtime History
        </Typography>
        {farm?.downTimeHistory?.length > 0 ? (
          <div className="mt-3 flex flex-col gap-2">
            {farm.downTimeHistory.map((item) => (
              <div key={item._id} className="p-3 shadow">
                <p className="text-sm text-blue-400">
                  {item.announcement?.message}
                </p>
                <div className="mt-2 text-sm">
                  <p>Started On: {new Date(item?.startAt).toLocaleString()}</p>
                  <p>Ended On: {new Date(item?.endAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3">No Downtimes</p>
        )}
      </Box>
    </Modal>
  );
}
