import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteMiner } from "../../hooks/adminMiner/useDeleteMiner";

export default function DeleteMinerPopup({ open, handleClose, minerId }) {
  const { isPending, mutateAsync } = useDeleteMiner();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete the Current Miner?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are You sure want to delete? All the data including the issues
          reported, messages, warranties and histories will be cleared. You will
          not be able to recover any data once deleted. Are you sure want to
          continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isPending}
          onClick={async () => {
            await mutateAsync(minerId);
            handleClose();
          }}
          sx={{ backgroundColor: "red", color: "white" }}
        >
          {isPending ? "....." : "Yes"}
        </Button>
        <Button
          onClick={handleClose}
          autoFocus
          disabled={isPending}
          sx={{ backgroundColor: "gray", color: "white" }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
