import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-[#2B347A] text-white flex justify-between items-center px-6 py-3 shadow-sm fixed top-0 left-0 right-0 z-10">
      {/* Left side: Logo */}
      <img src="/logo.png" alt="Intermine logo" className="w-50 p-1" />

      {/* Right side: Notification + Profile */}
      <div className="flex items-center gap-6 relative">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <IoNotificationsOutline size={22} />
          <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-[9px] rounded-full h-3 w-3 flex items-center justify-center"></span>
        </div>

        {/* Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="rounded-full h-8 w-8 border-2 border-white"
          />
          <span className="text-sm font-medium">Jack Wilder</span>
          <FaChevronDown size={12} />
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-12 bg-white text-gray-700 shadow-lg rounded-md w-40 z-10">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
              Profile
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
              Settings
            </button>
            <hr />
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
