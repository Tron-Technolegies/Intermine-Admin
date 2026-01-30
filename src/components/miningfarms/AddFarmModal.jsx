import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import useAddFarm from "../../hooks/adminFarms/useAddFarm";
import useEditFarm from "../../hooks/adminFarms/useEditFarm";
import { useGetServiceProviders } from "../../hooks/useServiceProvider";
import Loading from "../Loading";
import { farmContract, farmCountry, farmStatus } from "../../utils/DropDowns";

export default function AddFarmModal({ onClose, editFarm = null }) {
  const { isLoading, data } = useGetServiceProviders();
  const [airCooled, setAirCooled] = useState(false);
  const [immersion, setImmersion] = useState(false);
  const [hydro, setHydro] = useState(false);

  const addFarm = useAddFarm();
  const updateFarm = useEditFarm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    if (editFarm) formdata.append("farmId", editFarm._id);
    let farmType = [];
    airCooled && farmType.push("Air Cooled");
    hydro && farmType.push("Hydro");
    immersion && farmType.push("Immersion");
    formdata.append("farmType", farmType.join(","));
    const data = Object.fromEntries(formdata);
    console.log(data);

    if (editFarm) {
      await updateFarm.mutateAsync(data);
    } else {
      await addFarm.mutateAsync(data);
    }

    onClose();
  };

  useEffect(() => {
    if (editFarm) {
      if (!editFarm.farmType) return;
      const types = editFarm.farmType
        .toLowerCase()
        .split(",")
        .map((item) => item.trim());

      setAirCooled(types.includes("air cooled"));
      setHydro(types.includes("hydro"));
      setImmersion(types.includes("immersion"));
    }
  }, [editFarm]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-[350px] relative max-h-[550px] overflow-y-scroll">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <IoClose size={22} />
        </button>

        <p className="text-xl font-semibold mb-3">
          {editFarm ? "Edit Farm" : "Add Farm"}
        </p>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="text-xs font-medium">Farm Name</label>
          <input
            type="text"
            className="p-2 bg-neutral-100 shadow-md outline-none"
            name="farm"
            defaultValue={editFarm?.farm}
            required
          />
          <label className="text-xs font-medium">Capacity (KW)</label>
          <input
            type="number"
            className="p-2 bg-neutral-100 shadow-md outline-none"
            name="capacity"
            defaultValue={editFarm?.capacity}
            required
          />
          <label className="text-xs font-medium">Service Provider</label>
          {isLoading ? (
            <Loading />
          ) : (
            <select
              className="p-2 bg-neutral-100 text-sm shadow-md outline-none"
              name="serviceProvider"
              defaultValue={editFarm?.serviceProvider}
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
          <label className="text-xs font-medium">Farm Status</label>
          <select
            className="p-2 bg-neutral-100 text-sm shadow-md outline-none"
            name="farmStatus"
            defaultValue={editFarm?.farmStatus}
            required
          >
            {farmStatus.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="text-xs font-medium">Country</label>
          <select
            className="p-2 bg-neutral-100 text-sm shadow-md outline-none"
            name="country"
            defaultValue={editFarm?.country}
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
            defaultValue={editFarm?.contractType}
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
            defaultValue={editFarm?.dayOfCommissioning
              ?.toString()
              ?.slice(0, 10)}
            required
          />
          <label className="text-xs font-medium">Contract Duration</label>
          <input
            type="date"
            className="p-2 bg-neutral-100 shadow-md outline-none"
            name="contractDuration"
            defaultValue={editFarm?.contractDuration?.toString()?.slice(0, 10)}
            required
          />
          <label className="text-xs font-medium">Info</label>
          <textarea
            className="p-2 bg-neutral-100 shadow-md outline-none"
            name="info"
            rows={3}
            defaultValue={editFarm?.farmInfo}
          ></textarea>
          <button
            type="submit"
            disabled={updateFarm.isPending || addFarm.isPending}
            className="w-full bg-[#2B347A] text-white p-2 rounded-lg"
          >
            {editFarm
              ? updateFarm.isPending
                ? "Updating..."
                : "Update Farm"
              : addFarm.isPending
                ? "Adding..."
                : "Add Farm"}
          </button>
        </form>
      </div>
    </div>
  );
}
