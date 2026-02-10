import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAddServiceProvider } from "../../hooks/useServiceProvider";

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
  p: 3,
};

export default function AddServiceProviderModal({ open, handleClose }) {
  const { isPending, mutateAsync } = useAddServiceProvider();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Service Provider
        </Typography>
        <form
          className="my-3 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const formdata = new FormData(e.target);
            const data = Object.fromEntries(formdata);
            await mutateAsync(data);
            handleClose();
          }}
        >
          <label className="text-xs font-medium">Provider Name</label>
          <input
            type="text"
            placeholder="Enter Service provider name"
            name="name"
            required
            className="outline-none p-2 shadow-md rounded-md bg-neutral-100"
          />
          <label className="text-xs font-medium">Provider Email</label>
          <input
            type="email"
            placeholder="Enter Service provider email"
            name="email"
            required
            className="outline-none p-2 shadow-md rounded-md bg-neutral-100"
          />
          <label className="text-xs font-medium">Provider Contact</label>
          <input
            type="text"
            placeholder="Enter Service provider contact"
            name="contact"
            required
            className="outline-none p-2 shadow-md rounded-md bg-neutral-100"
          />
          <button
            type="submit"
            disabled={isPending}
            className="p-2 bg-blue-900 text-white cursor-pointer rounded-md mt-2 hover:bg-blue-800 duration-300 ease-in-out"
          >
            {isPending ? "Adding...." : "Add"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
