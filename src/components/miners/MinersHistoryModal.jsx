import React, { useEffect, useState } from "react";
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
  maxHeight: 500,
  bgcolor: "background.paper",
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function MinersHistoryModal({
  open,
  handleClose,
  history1,
  history2,
}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const newArr = [...history1, ...history2].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    setHistory(newArr);
  }, [history1, history2]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Repair and Change History
        </Typography>
        <div className="flex flex-col gap-2 my-5">
          {history.length > 0
            ? history.map((item) => (
                <div key={item._id} className="p-2 shadow flex flex-col gap-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-blue-500">
                      {item.type === "change" ? "Change Request" : "Issue"}
                    </p>
                    <p
                      className={`self-end text-xs px-2 py-1 rounded-md ${item.status === "Resolved" ? "bg-green-200 text-green-900" : "bg-yellow-200 text-yellow-900"}`}
                    >
                      {item.status}
                    </p>
                  </div>

                  {item.type === "repair" ? (
                    <div className="flex flex-col gap-2 text-xs">
                      <p>
                        Issue:{" "}
                        <span className="text-sm font-medium">
                          {item.issue.issueType}
                        </span>
                      </p>
                      <p>
                        Description:{" "}
                        <span className="text-sm font-medium">
                          {item.description}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 text-xs">
                      <p>
                        Requested Worker ID:{" "}
                        <span className="text-sm font-medium">
                          {item.changeRequest?.worker}
                        </span>
                      </p>
                      <p>
                        Requested Pool:{" "}
                        <span className="text-sm font-medium">
                          {" "}
                          {item.changeRequest?.pool}
                        </span>
                      </p>
                    </div>
                  )}
                  <p className="text-xs">
                    Reported On:{" "}
                    <span className="italic">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              ))
            : "No History"}
        </div>
      </Box>
    </Modal>
  );
}
