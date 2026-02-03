import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { algorithm, coolingTypes } from "../../utils/DropDowns";
import {
  useEditMinerModel,
  useGetSingleMinerModel,
} from "../../hooks/adminMiner/useMinerModels";
import Loading from "../Loading";

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

export default function EditMinerModelPopup({ open, handleClose, id }) {
  const { isError, isLoading, data } = useGetSingleMinerModel({ id });
  const { isPending, mutateAsync } = useEditMinerModel();

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    await mutateAsync({ data, id });
    handleClose();
  }
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Something Went Wrong</p>
  ) : (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Miner Model
        </Typography>
        <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
          <label className="text-xs font-medium">Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            defaultValue={data.manufacturer}
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <label className="text-xs font-medium">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={data.name}
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <label className="text-xs font-medium">Hashrate (TH/s)</label>
          <input
            type="number"
            name="hashrate"
            defaultValue={data.hashRate}
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <label className="text-xs font-medium">Power (Watt)</label>
          <input
            type="number"
            name="power"
            defaultValue={data.power}
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <label className="text-xs font-medium">Cooling Type</label>
          <select
            type="text"
            name="coolingType"
            defaultValue={data.coolingType}
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
            defaultValue={data.algorithm}
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
            defaultValue={data.coins}
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="p-2 bg-blue-900 hover:bg-blue-800 cursor-pointer text-white rounded-md mt-2"
          >
            {isPending ? "Updating...." : "Update Model"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
