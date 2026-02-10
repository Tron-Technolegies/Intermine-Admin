import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteFarm } from "../../hooks/adminFarms/useDeleteFarm";

export default function DeleteFarmModal({ open, handleClose, farm }) {
  const { isPending, deleteFarm } = useDeleteFarm();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Delete Mining Farm ${farm?.farm}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete the Mining Farm?. You will only be able to
          complete this operation if there is no miners at your farm
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isPending}
          onClick={async () => {
            await deleteFarm({ id: farm?._id });
            handleClose();
          }}
        >
          {isPending ? "...." : "Yes"}
        </Button>
        <Button onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
