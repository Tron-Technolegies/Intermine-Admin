import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import AddFarmModal from "../../components/miningfarms/AddFarmModal";
import FarmTable from "../../components/miningfarms/FarmTable";
import SearchFilterBar from "../../components/SearchFilterBar";
import { FaPen } from "react-icons/fa";

import useFarms from "../../hooks/adminFarms/useFarms";
import useFarmMiners from "../../hooks/adminFarms/useFarmsMiners";

export default function MiningFarm() {
  const [openAdd, setOpenAdd] = useState(false);
  const [editFarm, setEditFarm] = useState(null);

  const [selectedFarm, setSelectedFarm] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // LOAD ALL FARMS
  const { data: farms, isLoading: loadingFarms } = useFarms();

  // LOAD MINERS FOR SELECTED FARM
  const { data: minersData, isLoading: loadingMiners } = useFarmMiners(selectedFarm, page, search);

  const farmMiners = minersData?.miners || [];
  const totalPages = minersData?.totalPages || 1;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Mining Farms"
        subtitle="Manage all mining farm locations and power capacity"
        buttonText="Add Farm"
        onButtonClick={() => setOpenAdd(true)}
        ModalComponent={AddFarmModal}
      />

      {/* FARM CARDS */}
      <div className="bg-[#F5F5F5] m-4 rounded-lg p-4">
        <p className="text-2xl font-bold">Our Farms</p>
        <p className="text-gray-500">View and edit farm information.</p>

        <div className="flex gap-3 overflow-x-auto mt-3">
          {!loadingFarms &&
            farms?.map((farm) => (
              <div
                key={farm._id}
                className="bg-white rounded-lg px-3 py-2 flex items-center gap-3 shadow min-w-[180px]"
              >
                <p className="font-semibold">
                  {farm.farm} ({farm.capacity})
                </p>

                <FaPen
                  className="text-gray-600 cursor-pointer hover:text-black"
                  onClick={() => {
                    setEditFarm(farm);
                    setOpenAdd(true);
                  }}
                />
              </div>
            ))}
        </div>

        {/* SEARCH + FARM DROPDOWN */}
        <SearchFilterBar
          search={search}
          onSearch={(v) => {
            setSearch(v);
            setPage(1);
          }}
          filterValue={selectedFarm}
          onFilterChange={(v) => {
            setSelectedFarm(v);
            setPage(1);
          }}
          filterOptions={["ALL", ...(farms?.map((f) => f.farm) || [])]}
          placeholder="Search miners by model, worker, SL, MAC..."
          title="Farm Miners"
          subtitle="Select a farm to view miners"
        />

        {/* SHOW MINERS TABLE */}
        {selectedFarm && (
          <FarmTable
            miners={farmMiners}
            isLoading={loadingMiners}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </div>

      {/* ADD / EDIT FARM MODAL */}
      {openAdd && <AddFarmModal onClose={() => setOpenAdd(false)} editFarm={editFarm} />}
    </div>
  );
}
