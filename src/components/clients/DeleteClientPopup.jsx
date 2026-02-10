import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useDeleteClient } from "../../hooks/useClients";

export default function DeleteClientPopup({ open, handleClose, id, name }) {
  const { isPending, mutateAsync } = useDeleteClient();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Delete "${name}" ?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete {name} ? All the data including miners,
          issues reported, agreements, warranties, messages will be lost. Once
          deleted the action is not reversible. Are you sure want to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            await mutateAsync(id);
            handleClose();
          }}
          disabled={isPending}
          sx={{ backgroundColor: "red", color: "white" }}
        >
          {isPending ? "..." : "Yes"}
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
