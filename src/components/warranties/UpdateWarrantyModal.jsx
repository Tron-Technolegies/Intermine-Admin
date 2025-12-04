import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export default function UpdateWarrantyModal({ item, onClose }) {
  const queryClient = useQueryClient();

  const [type, setType] = useState(item.warrantyType);
  const [start, setStart] = useState(item.startDate?.substring(0, 10));
  const [end, setEnd] = useState(item.endDate?.substring(0, 10));

  const updateMutation = useMutation({
    mutationFn: async () => {
      return api.patch("/api/v1/warranty", {
        warrantyId: item._id,
        type,
        startDate: start,
        endDate: end,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["warranty"]);
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl w-[420px] p-6 shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-semibold text-lg">Update Warranty</h2>
            <p className="text-gray-500 text-sm">Update warranty for {item.miner?.model}</p>
          </div>
          <button onClick={onClose}>
            <IoClose size={22} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border w-full px-3 py-2 rounded"
            >
              <option>Manufacturer</option>
              <option>Intermine</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Start Date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border w-full px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">End Date</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border w-full px-3 py-2 rounded"
            />
          </div>

          <button
            onClick={() => updateMutation.mutate()}
            className="bg-[#1d1f7c] text-white w-full py-2 rounded-lg font-medium mt-4"
          >
            {updateMutation.isPending ? "Updating..." : "Update Warranty"}
          </button>
        </div>
      </div>
    </div>
  );
}
