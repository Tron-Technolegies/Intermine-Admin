import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  useAddWarranty,
  useGetMinersWithoutWarranty,
} from "../../hooks/useWarranty";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  maxHeight: 550,
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function AddWarrantyPopup({ open, handleClose }) {
  const { isLoading: minerLoading, data: miners } =
    useGetMinersWithoutWarranty();
  const { isPending, mutateAsync } = useAddWarranty();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Warranty
        </Typography>
        <p className="text-xs">For miners that has no existing warranty</p>
        <form
          className="my-5 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            await mutateAsync(data);
            handleClose();
            e.target.reset();
          }}
        >
          <label className="text-xs font-medium">Miner</label>
          <select
            required
            name="minerId"
            className="p-2 bg-neutral-100 rounded-md shadow-md outline-none"
          >
            {!minerLoading &&
              miners.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >{`${item.model} (${item.hashRate} TH/s, ${item.power} W) - ${item.clientName}`}</option>
              ))}
            {miners?.length < 1 && <option value={""}>No miners found</option>}
          </select>
          <label className="text-xs font-medium">Warranty Type</label>
          <select
            required
            name="type"
            className="p-2 bg-neutral-100 rounded-md shadow-md outline-none"
          >
            <option value={"Manufacturer"}>Manufacturer</option>
            <option value={"Intermine"}>Intermine</option>
          </select>
          <label className="text-xs font-medium">Start Date</label>
          <input
            required
            name="start"
            className="p-2 bg-neutral-100 rounded-md shadow-md outline-none"
            type="date"
          />
          <label className="text-xs font-medium">End Date</label>
          <input
            required
            name="end"
            className="p-2 bg-neutral-100 rounded-md shadow-md outline-none"
            type="date"
          />
          <button type="submit" className="bg-blue-900 text-white mt-2">
            {isPending ? "Adding...." : "Add Warranty"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
