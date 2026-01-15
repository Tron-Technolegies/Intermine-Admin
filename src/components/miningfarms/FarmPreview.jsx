import React, { useState } from "react";
import { GoCpu } from "react-icons/go";
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

export default function FarmPreview({ farm }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="p-3 bg-neutral-200 rounded-md flex flex-col gap-3">
      <p
        className={`${
          farm.farmStatus === "online"
            ? "bg-green-200 text-green-900"
            : "bg-red-200 text-red-900"
        } w-fit p-1 px-2 rounded-md text-sm`}
      >
        {farm.farmStatus}
      </p>
      <div className="flex justify-between">
        <p className="text-blue-700 font-semibold text-xl">{farm?.farm}</p>
        <p>
          Capacity:{" "}
          <span className="font-semibold text-xl">
            {farm?.current}KW / {farm?.capacity} KW
          </span>
        </p>
      </div>
      <p className="flex gap-3 items-center">
        <GoCpu size={30} />
        <span className="text-2xl">{farm?.miners?.length}</span>
        miners
      </p>

      <div className="flex justify-between">
        <p className="text-sm p-2 shadow w-fit rounded-md">
          Owned by: <span className="text-xl">{farm?.serviceProvider}</span>
        </p>
        <button
          onClick={handleOpen}
          className="p-2 bg-indigo-700 text-white rounded-md cursor-pointer"
        >
          Downtimes
        </button>
      </div>
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
                    <p>
                      Started On: {new Date(item?.startAt).toLocaleString()}
                    </p>
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
    </div>
  );
}
