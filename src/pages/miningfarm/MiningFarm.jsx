import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import AddFarmModal from "../../components/miningfarms/AddFarmModal";
import FarmTable from "../../components/miningfarms/FarmTable";
import SearchFilterBar from "../../components/SearchFilterBar";
import { FaPen } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import useFarms from "../../hooks/adminFarms/useFarms";
import useFarmMiners from "../../hooks/adminFarms/useFarmsMiners";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteFarm } from "../../hooks/adminFarms/useDeleteFarm";
import Loading from "../../components/Loading";
import { AddAnnouncementModal } from "../../components/miningfarms/AddAnnouncementModal";
import FarmPreview from "../../components/miningfarms/FarmPreview";

export default function MiningFarm() {
  const [openAdd, setOpenAdd] = useState(false);
  const [editFarm, setEditFarm] = useState(null);
  const [deleteFarm, setDeleteFarm] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  const [selectedFarm, setSelectedFarm] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // LOAD ALL FARMS
  const { data: farms, isLoading: loadingFarms } = useFarms();
  //delete farm
  const { isPending, deleteFarm: farmDelete } = useDeleteFarm();
  // LOAD MINERS FOR SELECTED FARM
  const { data: minersData, isLoading: loadingMiners } = useFarmMiners(
    selectedFarm,
    page,
    search
  );

  const farmMiners = minersData?.miners || [];
  const totalPages = minersData?.totalPages || 1;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteFarm(null);
    setOpen(false);
  };

  const hadleAnnouncementOpen = () => {
    setOpenAnnouncement(true);
  };

  const handleAnnouncementClose = () => {
    setOpenAnnouncement(false);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Mining Farms"
        subtitle="Manage all mining farm locations and power capacity"
        buttonText="Add Farm"
        onButtonClick={() => setOpenAdd(true)}
        ModalComponent={AddFarmModal}
      />
      <button
        onClick={hadleAnnouncementOpen}
        className="my-5 p-2 text-sm bg-blue-900 cursor-pointer text-white rounded-md flex gap-2 items-center"
      >
        Add Announcement <GrAnnounce size={18} />
      </button>
      {openAnnouncement && (
        <AddAnnouncementModal
          open={openAnnouncement}
          handleClose={handleAnnouncementClose}
          farms={farms}
        />
      )}
      {/* FARM CARDS */}
      <div className="bg-[#F5F5F5] my-4 rounded-lg p-4 flex flex-col gap-3">
        <p className="text-2xl font-bold">Our Farms</p>
        <p className="text-gray-500">View and edit farm information.</p>

        <div className="flex gap-3 flex-wrap mt-3 my-3">
          {!loadingFarms &&
            farms?.map((farm) => (
              <div
                key={farm._id}
                className="bg-white rounded-lg px-3 py-2 flex cursor-pointer items-center gap-3 shadow md:min-w-[180px]"
                onClick={() => setSelectedFarm(farm.farm)}
              >
                <p className="font-semibold">
                  {farm.farm} ({farm.capacity})
                </p>

                <FaPen
                  className="text-gray-600 cursor-pointer hover:text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditFarm(farm);
                    setOpenAdd(true);
                  }}
                />
                <AiOutlineDelete
                  className="text-red-700 text-lg cursor-pointer "
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteFarm(farm);
                    handleClickOpen();
                  }}
                />
              </div>
            ))}
        </div>
        {selectedFarm !== "ALL" && (
          <FarmPreview
            farm={farms?.find((item) => item.farm === selectedFarm)}
          />
        )}

        {isPending && <Loading />}
        {/* //Delete Popup */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Mining Farm?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure want to delete the Mining Farm?. You will only be
              able to complete this operation if there is no miners at your farm
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                farmDelete({ id: deleteFarm._id });
                handleClose();
              }}
            >
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </DialogActions>
        </Dialog>

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
            totalCapacity={minersData?.totalCapacity}
            currentCapacity={minersData?.currentCapacity}
          />
        )}
      </div>

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
