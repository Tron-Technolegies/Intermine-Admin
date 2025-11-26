import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import AddFarmModal from "../../components/miningfarms/AddFarmModal";
import FarmTable from "../../components/miningfarms/FarmTable";
import SearchFilterBar from "../../components/SearchFilterBar";
import { FaPen } from "react-icons/fa";

export default function MiningFarm() {
  const [openAdd, setOpenAdd] = useState(false);
  const [editFarm, setEditFarm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarm, setSelectedFarm] = useState(null);

  const [farms, setFarms] = useState([
    { name: "AL FALAH", capacity: "70KWH", miners: sampleData },
    { name: "AL ADLA", capacity: "100KWH", miners: sampleData },
    { name: "DUBAI UNIT", capacity: "50KWH", miners: sampleData },
    { name: "KSA LOT", capacity: "150KWH", miners: sampleData },
  ]);

  // FILTER MINERS BASED ON SEARCH
  const filteredFarm = selectedFarm && {
    ...selectedFarm,
    miners: selectedFarm.miners.filter(
      (m) =>
        m.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.mac.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.sl.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <PageHeader
        title="Mining Farms"
        subtitle="Manage system configuration, notifications, and administrative settings"
        buttonText="Add Farm"
        ModalComponent={AddFarmModal}
        onButtonClick={() => {
          setEditFarm(null);
          setOpenAdd(true);
        }}
      />

      <div className="bg-[#F5F5F5] m-4 rounded-lg p-4">
        <p className="text-2xl font-bold">Our Farms</p>
        <p className="text-gray-500">View and manage Mining Farms information for all miners.</p>

        {/* FARM SCROLL LIST */}
        <div className="flex gap-3 overflow-x-auto mt-3">
          {farms.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-lg px-3 py-2 flex items-center gap-3 shadow min-w-[180px]"
            >
              <p className="font-semibold">
                {f.name} ({f.capacity})
              </p>

              <FaPen
                className="text-gray-600 cursor-pointer hover:text-black"
                onClick={() => {
                  setEditFarm(f);
                  setOpenAdd(true);
                }}
              />
            </div>
          ))}
        </div>

        {/* SEARCH BAR */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Farm Locations by Model, Sl.No, Mac, Worker"
          customDropdown={
            <select
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none"
              onChange={(e) => setSelectedFarm(farms.find((f) => f.name === e.target.value))}
            >
              <option value="">All Farms</option>
              {farms.map((f, i) => (
                <option key={i}>{f.name}</option>
              ))}
            </select>
          }
        />

        {/* SHOW TABLE ONLY IF SELECTED */}
        {selectedFarm && (
          <div className="mt-3">
            <FarmTable farm={filteredFarm} />
          </div>
        )}
      </div>

      {/* MODAL */}
      {openAdd && (
        <AddFarmModal onClose={() => setOpenAdd(false)} setFarms={setFarms} editFarm={editFarm} />
      )}
    </div>
  );
}

// SAMPLE DATA (DO NOT REMOVE)
const sampleData = [
  {
    count: 1,
    model: "Antminer KS5 20TH",
    sl: "JYZZF1BBDJHA010S",
    mac: "92:18:91:E2:21:29",
    worker: "chrisbeck1212.005",
    status: "Running",
    note: "-",
    kWh: 3.15,
  },
  {
    count: 2,
    model: "Antminer KS5 20TH",
    sl: "JYZZF1BBDJHE008M",
    mac: "5C:F4:18:49:21:16",
    worker: "grueneberg.002",
    status: "Running",
    note: "-",
    kWh: 3.15,
  },
  {
    count: 3,
    model: "Antminer KS5 20TH",
    sl: "JYZZF1BBDJHE008M",
    mac: "D0:28:26:49:F6:36",
    worker: "grueneberg.002",
    status: "Disconnected",
    note: "Wire Down",
    kWh: 3.15,
  },
];
