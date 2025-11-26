import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header({ setSidebarOpen }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="bg-[#2B347A] text-white flex justify-between items-center px-4 md:px-6 py-3 shadow-sm fixed top-0 left-0 right-0 z-20">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white" onClick={() => setSidebarOpen((prev) => !prev)}>
          <MdOutlineMenu size={26} />
        </button>

        <img src="/logo.png" alt="Intermine logo" className="h-8" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 relative">
        <div className="relative cursor-pointer">
          <Link to="/notifications">
            <IoNotificationsOutline size={22} />
          </Link>
          <span className="absolute -top-1 -right-1 bg-red-500 text-[9px] rounded-full h-3 w-3 flex items-center justify-center"></span>
        </div>

        {/* Profile Dropdown */}
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="rounded-full h-8 w-8 border-2 border-white"
          />
          <span className="hidden sm:block text-sm font-medium">Jack Wilder</span>
          <FaChevronDown size={12} />
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 top-12 bg-white text-gray-700 shadow-lg rounded-md w-40 z-30">
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
