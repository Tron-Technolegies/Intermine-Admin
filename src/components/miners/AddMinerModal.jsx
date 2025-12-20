import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function AddMinerModal({ onClose }) {
  const queryClient = useQueryClient();
  const { data: clients, isLoading: loadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get("api/v1/admin/user/all", {
        params: {
          query: "",
          currentPage: 1,
          status: "ALL",
        },
      });
      return res.data.clients;
    },
  });

  const { data: locations, isLoading: loadingLocations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await api.get("/api/v1/mining-farms", {
        params: {
          currentPage: 1,
          location: "",
          query: "",
          status: "ALL",
        },
      });
      return res.data;
    },
  });

  const addMiner = useMutation({
    mutationFn: (payload) => api.post("/api/v1/admin/miner/add", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miners"] });
      toast.success("Miner Added Successfully");
      setTimeout(onClose, 400);
    },
    onError: (err) => {
      console.log("ADD MINER ERROR:", err.response?.data);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add miner";
      toast.error(message);
    },
  });

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") onClose();
  };

  return (
    <div
      id="overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl w-[92%] sm:w-96 max-h-[70vh] overflow-y-auto p-5 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          aria-label="Close history"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-1">Add Miner Details</h2>
        <p className="text-gray-500 text-sm mb-4">Create a new miner record.</p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formdata = new FormData(e.target);
            const cleaned = Object.fromEntries(formdata);
            addMiner.mutate(cleaned);
          }}
          className="flex flex-col gap-3"
        >
          {/* CLIENT DROPDOWN */}
          <select
            name="client"
            required
            className="w-full border p-2 rounded-md mt-1"
          >
            <option value="">Select Client</option>
            {!loadingClients &&
              clients?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
          </select>

          {/* WORKER ADDRESS */}
          <input
            name="workerId"
            required
            placeholder="Worker Address"
            className="w-full border p-2 rounded-md"
          />

          {/* SERIAL/MINER ID */}
          <input
            name="serialNumber"
            required
            placeholder="Miner Serial Number"
            className="w-full border p-2 rounded-md"
          />

          {/* MODEL */}
          <input
            name="model"
            placeholder="Model"
            required
            className="w-full border p-2 rounded-md"
          />

          {/* STATUS */}
          <select
            name="status"
            required
            className="w-full border p-2 rounded-md"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {/* LOCATION DROPDOWN */}
          <div>
            <label className="text-sm font-medium">Miner Location</label>
            <select
              name="location"
              className="w-full border p-2 rounded-md mt-1"
              required
            >
              <option value="">Select Location</option>
              {!loadingLocations &&
                locations?.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.farm}
                  </option>
                ))}
            </select>
          </div>

          {/* WARRANTY */}
          <input
            name="warranty"
            placeholder="Warranty Period"
            className="w-full border p-2 rounded-md"
            required
          />

          <select
            name="warrantyType"
            required
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select Warranty Type</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Intermine">Intermine</option>
          </select>

          {/* POOL ADDRESS */}
          <input
            name="poolAddress"
            placeholder="Pool Address"
            className="w-full border p-2 rounded-md"
            required
          />

          {/* HASH RATE (required) */}
          <input
            name="hashRate"
            type="number"
            placeholder="Hash Rate"
            className="w-full border p-2 rounded-md"
            required
          />

          {/* POWER (required) */}
          <input
            name="power"
            type="number"
            placeholder="Power"
            className="w-full border p-2 rounded-md"
            required
          />

          {/* MAC ADDRESS (required) */}
          <input
            name="macAddress"
            placeholder="MAC Address"
            className="w-full border p-2 rounded-md"
            required
          />

          {/* CONNECTION DATE */}
          <label>Connection Date</label>
          <input
            type="date"
            name="connectionDate"
            className="w-full border p-2 rounded-md"
            required
          />
          <label>Service Provider</label>
          <input
            value={"Dahab"}
            name="serviceProvider"
            className="w-full border p-2 rounded-md"
            required
          />
          {/* ADD BTN */}
          <button
            type="submit"
            className="bg-[#2B347A] text-white py-2 rounded-md mt-2 disabled:opacity-50"
            disabled={addMiner.isPending}
          >
            {addMiner.isPending ? "Adding..." : "Add Miner"}
          </button>
        </form>
      </div>
    </div>
  );
}
