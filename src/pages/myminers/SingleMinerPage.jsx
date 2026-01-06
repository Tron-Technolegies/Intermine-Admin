import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleMiner } from "../../hooks/adminMiner/useGetSingleMiner";
import Loading from "../../components/Loading";
import { BiChip } from "react-icons/bi";
import { FaBolt, FaMapMarkerAlt, FaTools, FaUser } from "react-icons/fa";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import EditMinerModal from "../../components/miners/EditMinerModal";
import MinersHistoryModal from "../../components/miners/MinersHistoryModal";
import ReportIssueModal from "../../components/overview/ReportIssueModal";

const getStatusColor = (status) => {
  switch (status) {
    case "online":
      return "bg-green-500 text-white";
    case "Warning":
      return "bg-yellow-500 text-white";
    case "offline":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function SingleMinerPage() {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetSingleMiner({ id });
  const [editForm, setEditForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleEditClick = (miner) => {
    setEditForm(true);
  };
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>something went wrong</p>
  ) : (
    <div>
      <div className="p-6 border-b border-[#DCDCDC] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">{data.model}</h1>
          <p className="text-md text-gray-500">
            Manage all mining equipment and monitor performance
          </p>
        </div>

        <Link
          to={"/miners"}
          className="bg-[#3893D0] hover:bg-[#2c7cb5] text-white rounded-xl px-4 py-1 transition-all"
        >
          Go Back
        </Link>
      </div>
      <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          {/* Chip + titles */}
          <div className="flex items-center gap-3">
            <BiChip className="text-[#3893D0]" size={24} />
            <div>
              <h3 className="text-xl font-bold text-gray-900 break-all">
                {data.serialNumber}
              </h3>
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500">{data.model}</p>
                <p className="text-sm text-gray-500">{data.workerId}</p>
              </div>
            </div>
          </div>

          <span
            className={`${getStatusColor(
              data.status
            )} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}
          >
            {data.status === "online"
              ? "Online"
              : data.status === "offline"
              ? "Offline"
              : "In Transit"}
          </span>
        </div>

        <div className="space-y-2 text-[#777] mb-4">
          {/* Client */}
          <div className="flex items-center gap-2">
            <FaUser size={14} />
            <span>{data.client?.clientName}</span>

            {data.client?.clientId && (
              <span className="text-xs bg-white px-2 py-1 border border-gray-400 rounded-full">
                {data.client.clientId}
              </span>
            )}
          </div>

          {/* Farm */}
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={14} />
            <span>{data.location}</span>
          </div>

          {/* Service Provider */}
          <div className="flex items-center gap-2">
            <FaTools size={14} />
            <span>{data.serviceProvider}</span>
          </div>
        </div>
        {data.trackingLink && (
          <div className="text-sm">Track - {data.trackingLink}</div>
        )}

        {/* ---------- METRICS BLOCK ---------- */}
        <div className="flex justify-between sm:justify-start sm:gap-16 py-4 border-t border-b border-gray-100 mb-4">
          {/* Hashrate */}
          <div className="flex items-center gap-2">
            <BiChip size={20} />
            <div>
              <div className="text-lg font-semibold">{data.hashRate}</div>
              <div className="text-xs text-gray-500">Hash Rate</div>
            </div>
          </div>

          {/* Power */}
          <div className="flex items-center gap-2">
            <FaBolt size={20} />
            <div>
              <div className="text-lg font-semibold">{data.power}W</div>
              <div className="text-xs text-gray-500">Power</div>
            </div>
          </div>
        </div>

        {/* ---------- WARRANTY & HISTORY ---------- */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-gray-600">
              <CiCalendarDate size={18} />
              <span>
                Purchased On:{" "}
                {data.connectionDate &&
                  new Date(data.connectionDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CiCalendar size={18} />
              <span>Warranty: {data.warranty} Years</span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowHistory(true);
            }}
            className="bg-[#3893D0] text-white px-4 py-2 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <MdHistory size={18} /> History
          </button>
        </div>

        {/* ---------- ACTION BUTTONS ---------- */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleEditClick(data)}
            className="flex-1 bg-[#787878] text-white rounded-xl py-2 font-medium cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => setShowReport(true)}
            className="border border-gray-400 text-gray-700 py-2 px-4 rounded-lg cursor-pointer"
          >
            Report Issue
          </button>
        </div>
      </div>
      {editForm && (
        <EditMinerModal minerData={data} onClose={() => setEditForm(false)} />
      )}
      {showHistory && (
        <MinersHistoryModal
          minerId={data._id}
          onClose={() => {
            setShowHistory(false);
          }}
        />
      )}
      {showReport && (
        <ReportIssueModal
          onClose={() => setShowReport(false)}
          currentMiner={data}
        />
      )}
    </div>
  );
}
