import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { algorithm, coolingTypes } from "../../utils/DropDowns";
import { useAddMinerModel } from "../../hooks/adminMiner/useGetSingleMiner";

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
export default function MinerModelPopup({ open, handleClose }) {
  const { isPending, mutateAsync } = useAddMinerModel();

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    await mutateAsync(data);
    handleClose();
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a New Miner Model
        </Typography>
        <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
          <label className="text-xs font-medium">Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <label className="text-xs font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <label className="text-xs font-medium">Hashrate (TH/s)</label>
          <input
            type="text"
            name="hashrate"
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <label className="text-xs font-medium">Power (Watt)</label>
          <input
            type="text"
            name="power"
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <label className="text-xs font-medium">Cooling Type</label>
          <select
            type="text"
            name="coolingType"
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          >
            {coolingTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="text-xs font-medium">Algorithm</label>
          <select
            type="text"
            name="algorithm"
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          >
            {algorithm.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="text-xs font-medium">Coins</label>
          <input
            type="text"
            name="coins"
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="p-2 bg-blue-900 hover:bg-blue-800 cursor-pointer text-white rounded-md mt-2"
          >
            {isPending ? "Adding...." : "Add New Model"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
