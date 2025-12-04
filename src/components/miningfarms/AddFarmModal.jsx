import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import useAddFarm from "../../hooks/adminFarms/useAddFarm";
import useEditFarm from "../../hooks/adminFarms/useEditFarm";

export default function AddFarmModal({ onClose, editFarm }) {
  const isEdit = Boolean(editFarm);

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const addFarm = useAddFarm();
  const updateFarm = useEditFarm();

  // Prefill data when editing
  useEffect(() => {
    if (isEdit) {
      setName(editFarm.farm);
      setCapacity(editFarm.capacity);
    }
  }, [editFarm]);

  const handleSubmit = async () => {
    if (isEdit) {
      await updateFarm.mutateAsync({
        farmId: editFarm._id,
        farm: name,
        capacity,
      });
    } else {
      await addFarm.mutateAsync({
        farm: name,
        capacity,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[350px] relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <IoClose size={22} />
        </button>

        <p className="text-xl font-semibold mb-3">{isEdit ? "Edit Farm" : "Add Farm"}</p>

        <input
          type="text"
          placeholder="Farm Name"
          value={name}
          className="border rounded w-full p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Capacity (70KWH)"
          value={capacity}
          className="border rounded w-full p-2 mb-3"
          onChange={(e) => setCapacity(e.target.value)}
        />

        <button onClick={handleSubmit} className="w-full bg-[#2B347A] text-white p-2 rounded-lg">
          {isEdit
            ? updateFarm.isPending
              ? "Updating..."
              : "Update Farm"
            : addFarm.isPending
            ? "Adding..."
            : "Add Farm"}
        </button>
      </div>
    </div>
  );
}
