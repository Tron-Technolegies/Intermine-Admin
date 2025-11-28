import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function Header({ setSidebarOpen }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => await api.post("/api/v1/auth/logout"),
    onSuccess: () => {
      toast.success("Logged out", { autoClose: 1000 });
      setTimeout(() => navigate("/login"), 1100);
    },
    onError: () => toast.error("Logout failed"),
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

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
        {/* Notifications */}
        <Link to="/notifications" className="relative cursor-pointer">
          <IoNotificationsOutline size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[9px] rounded-full h-3 w-3"></span>
        </Link>

        {/* Profile Dropdown */}
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="rounded-full h-8 w-8 border-2 border-white"
          />
          <span className="hidden sm:block text-sm font-medium">Jack Wilder</span>
          <FaChevronDown size={12} />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-12 bg-white text-gray-700 shadow-lg rounded-md w-40 z-30">
            <Link
              to="/settings"
              className="w-full block px-4 py-2 hover:bg-gray-100 text-sm"
              onClick={() => setDropdownOpen(false)}
            >
              Profile Settings
            </Link>

            <hr />

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
