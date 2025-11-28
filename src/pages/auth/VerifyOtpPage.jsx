import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [code, setCode] = useState("");

  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please start again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const verifyMutation = useMutation({
    mutationFn: async () => {
      return await api.post("/api/v1/auth/verifyOTP", { email, code });
    },
    onSuccess: () => {
      toast.success("Verification successful");
      setTimeout(() => {
        navigate("/reset-password", { state: { email, code } });
      }, 700);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Invalid verification code");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return toast.error("Please enter the verification code");
    verifyMutation.mutate();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
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

      <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6 sm:px-10 py-10 md:py-0">
        <div className="md:hidden flex justify-center mb-36 items-center mt-16">
          <img src="/logo-mobile.png" alt="Mobile Logo" className="w-36 sm:w-44" />
        </div>

        <div className="w-full max-w-sm sm:max-w-md">
          <div className="text-center md:text-left mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Verify Code</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Enter the 4-digit verification code sent to{" "}
              <span className="font-semibold">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 4-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={4}
              className="w-full text-center tracking-[0.5em] py-2.5 rounded-3xl border border-gray-300 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={verifyMutation.isPending}
              className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700"
            >
              {verifyMutation.isPending ? "Verifying..." : "Verify"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-gray-400 text-xs hover:text-blue-600"
            >
              Resend / Change Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
