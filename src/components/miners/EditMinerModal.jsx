import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function EditMinerModal({ minerData, onClose }) {
  const [loc, setLoc] = useState("");
  const queryClient = useQueryClient();

  // ====== Fetch Clients ======
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/user/all", {
        params: { query: "", currentPage: 1, status: "ALL" },
      });
      return res.data.clients;
    },
  });

  // ====== Fetch Mining Farms ======
  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await api.get("/api/v1/mining-farms", {
        params: { currentPage: 1, location: "", query: "", status: "ALL" },
      });
      return res.data;
    },
  });

  // ====== Update Mutation ======
  const updateMiner = useMutation({
    mutationFn: (payload) =>
      api.patch(`/api/v1/admin/miner/${minerData._id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miners"] });
      toast.success("Miner updated successfully!");
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Update failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Only allowed fields + serviceProvider for backend
    data.location = loc;
    data.serviceProvider = "Dahab";

    updateMiner.mutate(data);
  };

  useEffect(() => {
    if (minerData && locations) {
      const location = locations.find(
        (item) => item.farm === minerData.location
      );
      if (location) setLoc(location._id);
    }
  }, [minerData, locations]);

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") onClose();
  };

  return (
    <div
      id="overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl w-[92%] sm:w-96 max-h-[75vh] overflow-y-auto p-5 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-2">Edit Miner</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* CLIENT */}
          <select
            name="client"
            defaultValue={minerData?.client?._id}
            className="border p-2 rounded-md"
            required
          >
            <option value="">Select Client</option>
            {clients?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </select>

          {/* WORKER ID */}
          <input
            name="workerId"
            className="border p-2 rounded-md"
            placeholder="Worker ID"
            defaultValue={minerData?.workerId}
            required
          />

          {/* SERIAL NUMBER */}
          <input
            name="serialNumber"
            className="border p-2 rounded-md"
            placeholder="Serial Number"
            defaultValue={minerData?.serialNumber}
            required
          />

          {/* MODEL */}
          <input
            name="model"
            className="border p-2 rounded-md"
            placeholder="Model"
            defaultValue={minerData?.model}
            required
          />

          {/* STATUS */}
          <select
            name="status"
            defaultValue={minerData?.status}
            className="border p-2 rounded-md"
            required
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {/* LOCATION */}
          <select
            name="location"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="border p-2 rounded-md"
            required
          >
            <option value="">Select Mining Farm</option>
            {locations?.map((farm) => (
              <option key={farm._id} value={farm._id}>
                {farm.farm}
              </option>
            ))}
          </select>

          {/* WARRANTY */}
          <input
            name="warranty"
            defaultValue={minerData?.warranty}
            className="border p-2 rounded-md"
            placeholder="Warranty (years)"
            required
          />

          {/* POOL ADDRESS */}
          <input
            name="poolAddress"
            defaultValue={minerData?.poolAddress}
            className="border p-2 rounded-md"
            placeholder="Pool Address"
            required
          />

          {/* CONNECTION DATE */}
          <input
            type="date"
            name="connectionDate"
            defaultValue={minerData?.connectionDate?.slice(0, 10)}
            className="border p-2 rounded-md"
            required
          />

          {/* HASH RATE */}
          <input
            name="hashRate"
            defaultValue={minerData?.hashRate}
            className="border p-2 rounded-md"
            placeholder="Hash Rate"
            required
          />

          {/* POWER */}
          <input
            name="power"
            defaultValue={minerData?.power}
            className="border p-2 rounded-md"
            placeholder="Power (W)"
            required
          />

          {/* MAC ADDRESS */}
          <input
            name="macAddress"
            defaultValue={minerData?.macAddress}
            className="border p-2 rounded-md"
            placeholder="MAC Address"
            required
          />

          <button
            type="submit"
            className="bg-blue-900 text-white py-2 rounded-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
