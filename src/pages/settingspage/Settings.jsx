import React, { useContext, useState } from "react";
import PageHeader from "../../components/PageHeader";
import api from "../../api/api";
import { toast } from "react-toastify";
import { UserContext } from "../../UserContext";

export default function SettingsPage() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    companyName: user?.companyName || "",
    companyAddress: user?.address?.street || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.patch("/api/v1/auth/admin-settings", {
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        email: formData.email,
      });

      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Settings"
        subtitle="Manage system configuration, notifications, and administrative settings"
      />

      {/* MAIN CARD */}
      <div className="bg-gray-50 p-8 mt-4 rounded-xl border border-gray-200 max-w-5xl">
        {/* TAB */}
        <div className="flex gap-3 pb-3 mb-6">
          <button className="px-8 py-2 bg-[#0000007D] relative bottom-8 rounded-lg text-sm font-medium">
            General
          </button>
        </div>

        <h2 className="text-lg font-semibold">General Settings</h2>
        <p className="text-gray-500 text-sm mb-6">
          Configure basic system settings and preferences
        </p>

        {/* INPUTS */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full mt-1 bg-white border border-[#DCDCDC] rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Admin Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 bg-white border border-[#DCDCDC] rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-normal">Company Address</label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className="w-full mt-1 bg-white border border-[#DCDCDC] rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#3893D0] text-white px-5 py-2 mt-5 rounded-md hover:bg-blue-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save General Settings"}
        </button>
      </div>
    </div>
  );
}
