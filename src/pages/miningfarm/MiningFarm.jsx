import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import AddFarmModal from "../../components/miningfarms/AddFarmModal";
import useFarmMiners from "../../hooks/adminFarms/useFarmsMiners";
import AllFarmPreview from "../../components/miningfarms/AllFarmPreview";
import useFarms from "../../hooks/adminFarms/useFarms";
import Loading from "../../components/Loading";

export default function MiningFarm() {
  const [openAdd, setOpenAdd] = useState(false);
  const [editFarm, setEditFarm] = useState(null);
  const { isLoading, isError, data: allFarms } = useFarms();

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
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>Something went wrong</p>
      ) : (
        <div className="bg-[#F5F5F5] my-4 rounded-lg p-4 flex flex-col gap-3">
          <AllFarmPreview farms={allFarms} />
        </div>
      )}

      {/* ADD / EDIT FARM MODAL */}
      {openAdd && (
        <AddFarmModal
          onClose={() => {
            setOpenAdd(false);
            setEditFarm(null);
          }}
          editFarm={editFarm}
        />
      )}
    </div>
  );
}
