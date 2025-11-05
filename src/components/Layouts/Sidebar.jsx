import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiGrid, FiFileText, FiBell, FiMessageSquare, FiSettings, FiCpu } from "react-icons/fi";
import { GiMining } from "react-icons/gi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { PiChartPieSliceFill, PiUsersThreeBold } from "react-icons/pi";
import { TbCancel } from "react-icons/tb";
import { IoShieldOutline } from "react-icons/io5";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-white h-screen border-r border-slate-200 flex flex-col transition-all duration-300 w-20 md:w-64 fixed top-[60px] left-0 z-10">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3 mt-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive || location.pathname === "/"
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <PiChartPieSliceFill className="w-5 h-5" />
          <span className="hidden md:inline">Overview</span>
        </NavLink>

        <NavLink
          to="/miners"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition  ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <FiCpu className="w-5 h-5" />
          <span className="hidden md:inline">Miners</span>
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition  ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <PiUsersThreeBold className="w-5 h-5" />
          <span className="hidden md:inline">Clients</span>
        </NavLink>

        <NavLink
          to="/issues"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <MdOutlineErrorOutline className="w-5 h-5" />
          <span className="hidden md:inline">Issues</span>
        </NavLink>

        <NavLink
          to="/offline-miners"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <TbCancel className="w-5 h-5" />
          <span className="hidden md:inline">Offline Miners</span>
        </NavLink>

        <NavLink
          to="/agreements"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <FiFileText className="w-5 h-5" />
          <span className="hidden md:inline">Agreements</span>
        </NavLink>

        <NavLink
          to="/farms"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <GiMining className="w-5 h-5" />
          <span className="hidden md:inline">Mining Farms</span>
        </NavLink>

        <NavLink
          to="/warranties"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <IoShieldOutline className="w-5 h-5" />
          <span className="hidden md:inline">Warranties</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition  ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <FiBell className="w-5 h-5" />
          <span className="hidden md:inline">Notifications</span>
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <FiMessageSquare className="w-5 h-5" />
          <span className="hidden md:inline">Pending Messages</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition  ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <FiSettings className="w-5 h-5" />
          <span className="hidden md:inline">Settings</span>
        </NavLink>
      </nav>
    </div>
  );
}
