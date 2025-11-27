import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section - Desktop Only */}
      <div
        className="hidden md:flex w-full md:w-2/3 relative items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Login-img.png')",
        }}
      >
        <div className="z-10 text-center px-8">
          <img
            src="/login-logo.png"
            alt="Login Logo"
            className="mx-auto max-w-[220px] md:max-w-[280px] lg:max-w-[340px]"
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6 sm:px-10 py-10 md:py-0">
        {/* Mobile Logo */}
        <div className="md:hidden flex justify-center mb-36 items-center mt-16">
          <img
            src="/logo-mobile.png"
            alt="Mobile Logo"
            className="w-36 sm:w-44 h-auto object-contain"
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Header */}
          <div className="text-center md:text-left mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Hello Again!</h1>
            <p className="text-gray-500 text-sm sm:text-base">Welcome Back</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 text-sm" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
              />
              {/* Show/Hide Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-500 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base mt-3"
            >
              Login
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button className="text-gray-400 text-xs sm:text-sm hover:text-blue-600 transition">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
