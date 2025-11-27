import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout */}
      <div className="flex flex-col flex-1 md:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* PAGE RENDER HERE */}
        <main className="p-4 bg-white min-h-screen mt-[60px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
