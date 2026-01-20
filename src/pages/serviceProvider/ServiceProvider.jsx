import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import AddServiceProviderModal from "../../components/serviceProvider/AddServiceProviderModal";
import ServiceProviderTable from "../../components/serviceProvider/ServiceProviderTable";

export default function ServiceProvider() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title={"Service Providers"}
        subtitle={"Monitor and Manage all the service providers"}
      />
      <button
        onClick={() => handleOpen()}
        className="bg-[#3893D0] w-fit self-end cursor-pointer hover:bg-[#2c7cb5] text-white rounded-xl px-4 py-1 transition-all flex items-center gap-2"
      >
        <span className="text-lg font-bold">+</span>
        Add New
      </button>
      <AddServiceProviderModal open={open} handleClose={handleClose} />
      <ServiceProviderTable />
    </div>
  );
}
