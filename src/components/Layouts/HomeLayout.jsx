import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function HomeLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-20 md:ml-64">
        <Header />
        <main className="p-6 bg-[#F9FAFB] min-h-screen mt-[60px]">{children}</main>
      </div>
    </div>
  );
}
