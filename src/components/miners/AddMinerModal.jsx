import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useGetUserDropdowns } from "../../hooks/useDropdowns";
import { useGetServiceProviders } from "../../hooks/useServiceProvider";
import Loading from "../Loading";
import { useGetMinerModels } from "../../hooks/adminMiner/useGetSingleMiner";

export default function AddMinerModal({ onClose }) {
  const queryClient = useQueryClient();
  const [warranty, setWarranty] = useState(false);

  const { isLoading: loadingClients, data: clients } = useGetUserDropdowns({
    search: "",
  });
  const { isLoading: serviceProviderLoading, data: serviceProviders } =
    useGetServiceProviders();

  const { isLoading: minerModelLoading, data: minerModels } =
    useGetMinerModels();

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

  return (
    <div
      id="overlay"
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
          className="flex flex-col gap-2"
        >
          {/* CLIENT DROPDOWN */}
          <label className="text-xs">Client</label>
          <select
            name="client"
            required
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select Client</option>
            {!loadingClients &&
              clients?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.clientName}
                </option>
              ))}
          </select>

          {/* WORKER ADDRESS */}
          <label className="text-xs">Worker Id</label>
          <input
            name="workerId"
            placeholder="Worker Address"
            className="w-full border p-2 rounded-md"
          />

          {/* SERIAL/MINER ID */}
          <label className="text-xs">Serial Number</label>
          <input
            name="serialNumber"
            placeholder="Miner Serial Number"
            className="w-full border p-2 rounded-md"
          />

          {/* MODEL */}
          <label className="text-xs">Model</label>
          {minerModelLoading ? (
            <Loading />
          ) : (
            <select
              name="model"
              placeholder="Model"
              required
              className="w-full border p-2 rounded-md"
            >
              {minerModels.map((item) => (
                <option key={item._id} value={item._id}>
                  {`${item.manufacturer} ${item.name} (${item.hashRate}TH/s, ${item.power}W)`}
                </option>
              ))}
            </select>
          )}

          {/* STATUS */}
          <label className="text-xs">Status</label>
          <select
            name="status"
            required
            className="w-full border p-2 rounded-md"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="In Transit">In Transit</option>
          </select>
          {/* Tracking Link */}
          <label className="text-xs">Tracking Link</label>
          <input
            name="tracking"
            placeholder="Enter tracking id (optional)"
            className="w-full border p-2 rounded-md"
          />
          {/* LOCATION DROPDOWN */}
          <div>
            <label className="text-xs">Miner Location</label>
            <select name="location" className="w-full border p-2 rounded-md">
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
          <label className="text-xs">Warranty</label>
          <div className="flex gap-2 item-center">
            <input
              type="checkbox"
              checked={warranty}
              onChange={(e) => setWarranty(e.target.checked)}
            />
            <label className="text-xs">Need Warranty ?</label>
          </div>
          {warranty && (
            <>
              <label className="text-xs">Warranty Type</label>
              <select
                required
                name="warrantyType"
                className="w-full border p-2 rounded-md"
              >
                <option value="Manufacturer">Manufacturer</option>
                <option value="Intermine">Intermine</option>
              </select>
              <label className="text-xs">Warranty Start</label>
              <input
                name="warrantyStart"
                type="date"
                required
                placeholder="Warranty Period"
                className="w-full border p-2 rounded-md"
              />
              <label className="text-xs">Warranty End</label>
              <input
                name="warrantyEnd"
                type="date"
                required
                placeholder="Warranty Period"
                className="w-full border p-2 rounded-md"
              />
            </>
          )}

          {/* POOL ADDRESS */}
          <label className="text-xs">Pool Address</label>
          <input
            name="poolAddress"
            placeholder="Pool Address"
            className="w-full border p-2 rounded-md"
          />

          {/* MAC ADDRESS (required) */}
          <label className="text-xs">Mac Address</label>
          <input
            name="macAddress"
            placeholder="MAC Address"
            className="w-full border p-2 rounded-md"
          />
          {/* COINS */}

          {/* CONNECTION DATE */}
          <label className="text-xs">Buying Date</label>
          <input
            type="date"
            name="connectionDate"
            className="w-full border p-2 rounded-md"
          />
          {serviceProviderLoading ? (
            <Loading />
          ) : (
            <>
              <label className="text-xs">Service Provider</label>
              <select
                name="serviceProvider"
                className="w-full border p-2 rounded-md"
              >
                <option value={""}>Choose Provider</option>
                {serviceProviders.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}

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
