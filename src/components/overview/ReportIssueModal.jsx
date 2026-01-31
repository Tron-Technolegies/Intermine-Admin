import { useEffect, useState } from "react";
import {
  useGetMinerDropdown,
  useGetUserDropdowns,
} from "../../hooks/useDropdowns";
import useIssueTypes from "../../hooks/useIssueTypes";
import Switch from "@mui/material/Switch";
import { useReportIssue } from "../../hooks/useReportIssue";
import { useGetClientMiners } from "../../hooks/useIssues";

export default function ReportIssueModal({ onClose, currentMiner }) {
  const [searchClient, setSearchClient] = useState("");

  const [checked, setChecked] = useState(false);
  const [inform, setInform] = useState(false);
  const [clientId, setClientId] = useState("");
  const [worker, setWorker] = useState("");
  const [machine, setMachine] = useState(null);

  const { isLoading: clientLoading, data: clients } = useGetUserDropdowns({
    search: searchClient,
  });
  const { isLoading: clientMinerLoading, data: clientMiners } =
    useGetClientMiners({ clientId });

  const { isLoading: issueLoading, data: issues } = useIssueTypes();
  const { isPending, mutate } = useReportIssue();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.status = checked ? "online" : "offline";
    data.inform = inform ? "inform" : "not-inform";
    data.miner = machine._id;

    mutate({ data });
    onClose();
  }

  useEffect(() => {
    if (worker) {
      const newMac = clientMiners.find((item) => item.workerId === worker);
      if (newMac) setMachine(newMac);
    }
  }, [worker]);

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
        <form className="my-5 flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="text-xs">Search Client</label>
          <input
            type="search"
            value={searchClient}
            onChange={(e) => setSearchClient(e.target.value)}
            className="p-2 rounded-md shadow bg-gray-100 outline-none"
          />
          <label className="text-xs">Client</label>
          <select
            name="user"
            className="p-2 rounded-md shadow bg-gray-100 outline-none"
            required
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value={""}>select client</option>
            {!clientLoading &&
              clients?.map((x) => (
                <option key={x._id} value={x._id} className="rounded-md">
                  {x.clientName}
                </option>
              ))}
          </select>
          <label className="text-xs">Worker Id</label>
          <select
            required
            className="p-2 rounded-md shadow bg-gray-100 outline-none"
            name="workerAddress"
            onChange={(e) => setWorker(e.target.value)}
          >
            <option value={""}>select Worker</option>
            {!clientMinerLoading &&
              clientMiners?.map((x) => (
                <option key={x._id} value={x.workerId}>
                  {x.workerId}
                </option>
              ))}
          </select>
          <label className="text-xs">Machine Model</label>
          <input
            name="miner"
            required
            disabled
            value={machine?.model}
            className="p-2 rounded-md shadow bg-gray-100 outline-none"
          />

          {/* <select
            name="miner"
            required
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            className="p-2 rounded-md shadow bg-gray-100 outline-none"
          >
            {!clientMinerLoading &&
              clientMiners?.map((x) => (
                <option key={x._id} value={x._id}>
                  {`${x.manufacturer} ${x.name} (${x.hashRate}TH/s, ${x.power}W)`}
                </option>
              ))}
          </select> */}
          <label className="text-xs">Issue</label>
          <select
            name="issue"
            className="p-2 rounded-md shadow bg-gray-100 outline-none"
            required
          >
            {!issueLoading &&
              issues?.map((x) => (
                <option key={x._id} value={x._id}>
                  {x.issueType}
                </option>
              ))}
          </select>
          <label className="text-xs">Issue Description</label>
          <textarea
            rows={3}
            name="description"
            className="p-2 rounded-md shadow bg-gray-100 outline-none"
          ></textarea>
          <label className="text-xs">
            {checked ? "Online" : "Offline"}
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          </label>
          <label className="text-xs">
            Inform Client
            <Switch
              checked={inform}
              onChange={(e) => setInform(e.target.checked)}
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="p-2 rounded-md bg-indigo-700 text-white cursor-pointer"
          >
            {isPending ? "Creating...." : "Create Issue Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}
