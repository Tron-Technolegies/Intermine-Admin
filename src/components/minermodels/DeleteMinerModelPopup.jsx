import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteMinerModel } from "../../hooks/adminMiner/useMinerModels";

export default function DeleteMinerModelPopup({ open, handleClose, minerId }) {
  const { isPending, mutateAsync } = useDeleteMinerModel();
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
          Are You sure want to delete? You wont be able to recover any data. All
          the data thats been used previously wont be affected
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
