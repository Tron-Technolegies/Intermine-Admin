import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiFileText,
  FiBell,
  FiMessageSquare,
  FiSettings,
  FiCpu,
} from "react-icons/fi";
import { GiMining } from "react-icons/gi";
import { MdOutlineErrorOutline, MdMiscellaneousServices } from "react-icons/md";
import { PiChartPieSliceFill, PiUsersThreeBold } from "react-icons/pi";
import { TbCancel } from "react-icons/tb";
import { IoShieldOutline } from "react-icons/io5";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className=" bg-black/40 backdrop-blur-sm lg:hidden z-20"
        />
      )}

      <div
        className={`
    fixed top-[60px] left-0 h-[calc(100vh-60px)] bg-white border-r border-slate-200 
    w-72 z-30 transform transition-transform duration-300
    overflow-y-auto
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
      >
        <nav className="flex flex-col gap-5 p-4 mt-4 ">
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
            <span className="inline">Overview</span>
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
            <span className="inline">Miners</span>
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
            <span className="inline">Clients</span>
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
            <span className="inline">Issues</span>
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
            <span className="inline">Offline Miners</span>
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
            <span className="inline">Agreements</span>
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
            <span className="inline">Warranties</span>
          </NavLink>
          <NavLink
            to="/service-provider"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
                isActive
                  ? "bg-[#2B347A] text-white"
                  : "text-black hover:bg-[#2B347A] hover:text-white"
              }`
            }
          >
            <MdMiscellaneousServices className="w-5 h-5" />
            <span className="inline">Service Provider</span>
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
            <span className="inline">Mining Farms</span>
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
            <span className="inline">Notifications</span>
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
            <span className="inline">Pending Messages</span>
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
            <span className="inline">Settings</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}
