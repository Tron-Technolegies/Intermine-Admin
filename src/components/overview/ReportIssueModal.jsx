import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import useIssueTypes from "../../hooks/useIssueTypes";
import { useReportIssue } from "../../hooks/useReportIssue";

export default function ReportIssueModal({ onClose, currentMiner }) {
  const { isLoading, data } = useQuery({
    queryKey: ["miner-dropdown"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/dropdown/miners");
      return data;
    },
  });
  const { data: types } = useIssueTypes();
  const { mutate } = useReportIssue();

  const [isOnline, setIsOnline] = useState(true);
  const [workerId, setWorkerId] = useState("");
  const [miner, setMiner] = useState(null);
  const [minerId, setMinerId] = useState("");
  const [issueObject, setIssueObject] = useState(null);
  const [issue, setIssue] = useState("");
  const [user, setUser] = useState("");
  // const handleOutsideClick = (e) => {
  //   if (e.target.id === "overlay") onClose();
  // };

  useEffect(() => {
    if (data?.length > 0) {
      if (currentMiner) {
        setMiner(currentMiner);
      } else {
        setMiner(data[0]);
      }
    }
  }, [data, currentMiner]);

  useEffect(() => {
    if (types?.length > 0) {
      setIssueObject(types[0]);
    }
  }, [types]);

  useEffect(() => {
    if (miner) {
      setWorkerId(miner.workerId);
      setUser(miner.client._id || miner.client);
      setMinerId(miner._id);
    }
  }, [miner]);

  useEffect(() => {
    if (issueObject) {
      setIssue(issueObject._id);
    }
  }, [issueObject]);

  function handleClick() {
    mutate({
      user,
      miner: minerId,
      issue,
      workerAddress: workerId,
      offline: isOnline ? false : true,
    });
    onClose();
  }

  return (
    <div
      id="overlay"
      // onClick={handleOutsideClick}
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

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Miner Details
            </label>
            <select
              type="text"
              placeholder="Enter miner details"
              value={minerId}
              onChange={(e) => {
                const selected = data.find((m) => m._id === e.target.value);
                setMiner(selected);
              }}
              className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200"
            >
              {data &&
                data.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.model}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Worker Address
            </label>
            <input
              type="text"
              value={workerId}
              onChange={(e) => setWorkerId(e.target.value)}
              placeholder="Enter worker address"
              className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Report what issue
            </label>
            <select
              value={issue}
              onChange={(e) => {
                const selected = types.find((m) => m._id === e.target.value);
                setIssueObject(selected);
              }}
              className="border rounded-lg w-full px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200"
            >
              {types &&
                types.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.issueType}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* Machine Toggle */}
        <div className="flex gap-4 items-center mt-4">
          <label className="font-medium text-gray-700">Machine</label>
          <div
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center cursor-pointer ${
              isOnline ? "text-green-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  isOnline ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          className="bg-indigo-600 text-white w-full mt-5 py-2 rounded-lg"
          onClick={handleClick}
        >
          Report Issue
        </button>
      </div>
    </div>
  );
}
