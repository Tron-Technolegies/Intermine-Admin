import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGetServiceProviders } from "../../hooks/useServiceProvider";
import Loading from "../Loading";
import { farmContract, farmCountry, farmStatus } from "../../utils/DropDowns";
import useEditFarm from "../../hooks/adminFarms/useEditFarm";

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

export default function EditFarmModel({ open, handleClose, farm }) {
  const { isLoading, data } = useGetServiceProviders();
  const [airCooled, setAirCooled] = useState(false);
  const [immersion, setImmersion] = useState(false);
  const [hydro, setHydro] = useState(false);
  const { mutateAsync, isPending } = useEditFarm();

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    let farmType = [];
    airCooled && farmType.push("Air Cooled");
    hydro && farmType.push("Hydro");
    immersion && farmType.push("Immersion");
    formdata.append("farmType", farmType.join(","));
    formdata.append("farmId", farm?._id);
    const data = Object.fromEntries(formdata);
    await mutateAsync(data);
    handleClose();
  }

  useEffect(() => {
    if (farm) {
      if (!farm.farmType) return;
      const types = farm.farmType
        .toLowerCase()
        .split(",")
        .map((item) => item.trim());

      setAirCooled(types.includes("air cooled"));
      setHydro(types.includes("hydro"));
      setImmersion(types.includes("immersion"));
    }
  }, [farm]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Farm {farm?.farm}
        </Typography>
        <form
          className="mt-3 flex flex-col gap-2 text-xs"
          onSubmit={handleSubmit}
        >
          <label className="text-xs font-medium">Farm Name</label>
          <input
            type="text"
            className="p-2 bg-neutral-100 shadow-md outline-none"
            name="farm"
            defaultValue={farm?.farm}
            required
          />
          <label className="text-xs font-medium">Capacity (KW)</label>
          <input
            type="number"
            className="p-2 bg-neutral-100 shadow-md outline-none"
            name="capacity"
            defaultValue={farm?.capacity}
            required
          />
          <label className="text-xs font-medium">Service Provider</label>
          {isLoading ? (
            <Loading />
          ) : (
            <select
              className="p-2 bg-neutral-100 text-sm shadow-md outline-none"
              name="serviceProvider"
              defaultValue={farm?.serviceProvider}
              required
            >
              {data.map((item) => (
                <option value={item.name} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
          <label className="text-xs font-medium">Farm Type</label>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={airCooled}
              onChange={(e) => setAirCooled(e.target.checked)}
            />
            <p className="text-xs">Air Cooled</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={immersion}
              onChange={(e) => setImmersion(e.target.checked)}
            />
            <p className="text-xs">Immersion</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={hydro}
              onChange={(e) => setHydro(e.target.checked)}
            />
            <p className="text-xs">Hydro</p>
          </div>
          <label className="text-xs font-medium">Country</label>
          <select
            className="p-2 bg-neutral-100 text-sm shadow-md outline-none"
            name="country"
            defaultValue={farm?.country}
            required
          >
            {farmCountry.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="text-xs font-medium">Contract Type</label>
          <select
            className="p-2 bg-neutral-100 text-sm shadow-md outline-none"
            name="contract"
            defaultValue={farm?.contractType}
            required
          >
            {farmContract.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="text-xs font-medium">Day of Commissioning</label>
          <input
            type="date"
            className="p-2 bg-neutral-100 shadow-md outline-none"
            name="commissioningDay"
            defaultValue={farm?.dayOfCommissioning?.toString()?.slice(0, 10)}
            required
          />
          <label className="text-xs font-medium">Contract Duration</label>
          <input
            type="date"
            className="p-2 bg-neutral-100 shadow-md outline-none"
            defaultValue={farm?.contractDuration?.toString()?.slice(0, 10)}
            name="contractDuration"
            required
          />
          <label className="text-xs font-medium">Info</label>
          <textarea
            className="p-2 bg-neutral-100 shadow-md outline-none"
            name="info"
            defaultValue={farm?.farmInfo}
            rows={3}
          ></textarea>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#2B347A] text-white p-2 rounded-lg"
          >
            {isPending ? "Updating..." : "Update Farm"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
