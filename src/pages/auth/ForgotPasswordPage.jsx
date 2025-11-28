import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const forgotMutation = useMutation({
    mutationFn: async () => {
      return await api.post("/api/v1/auth/forgot-password", { email });
    },
    onSuccess: () => {
      toast.success("Verification code sent to your email");
      // pass email to next step
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 700);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Unable to send verification code");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email");
    forgotMutation.mutate();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section - same as Login */}
      <div
        className="hidden md:flex w-full md:w-2/3 relative items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Login-img.png')" }}
      >
        <div className="z-10 text-center px-8">
          <img
            src="/login-logo.png"
            alt="Login Logo"
            className="mx-auto max-w-[220px] md:max-w-[280px] lg:max-w-[340px]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6 sm:px-10 py-10 md:py-0">
        <div className="md:hidden flex justify-center mb-36 items-center mt-16">
          <img src="/logo-mobile.png" alt="Mobile Logo" className="w-36 sm:w-44" />
        </div>

        <div className="w-full max-w-sm sm:max-w-md">
          <div className="text-center md:text-left mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Forgot Password</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Enter your registered email to receive a verification code.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 text-sm" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-3xl border border-gray-300 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={forgotMutation.isPending}
              className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700"
            >
              {forgotMutation.isPending ? "Sending..." : "Send Code"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-gray-400 text-xs hover:text-blue-600"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
