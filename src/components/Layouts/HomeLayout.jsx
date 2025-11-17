import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function HomeLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 md:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="p-4 bg-white min-h-screen mt-[60px]">{children}</main>
      </div>
    </div>
  );
}
