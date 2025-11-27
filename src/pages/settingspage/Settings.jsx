import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    warrantyType: "intermine",
    companyName: "Intermine Operations",
    adminEmail: "admin@intermine.com",
    companyAddress: "123 Mining District, Crypto Valley",
    timezone: "UTC",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Saved Data:", formData);
    alert("Settings Saved!");
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Settings"
        subtitle="Manage system configuration, notifications, and administrative settings"
      />

      {/* Card */}
      <div className="bg-gray-50 p-8 mt-4 rounded-xl border border-gray-200 max-w-5xl">
        {/* Tab */}
        <div className="flex gap-3 border-b pb-3 mb-6">
          <button className="px-8 py-2 bg-[#0000007D] relative bottom-8 rounded-lg text-sm font-medium">
            General
          </button>
        </div>

        <h2 className="text-lg font-semibold">General Settings</h2>
        <p className="text-gray-500 text-sm mb-6">
          Configure basic system settings and preferences
        </p>

        {/* Warranty Type */}
        <div className="mb-6">
          <label className="font-medium text-sm">Warranty Type</label>
          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="warrantyType"
                value="intermine"
                checked={formData.warrantyType === "intermine"}
                onChange={handleChange}
              />
              Intermine
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="warrantyType"
                value="manufacturer"
                checked={formData.warrantyType === "manufacturer"}
                onChange={handleChange}
              />
              Manufacturer
            </label>
          </div>
        </div>

        {/* Inputs in Two Columns */}
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
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              className="w-full mt-1 bg-white border border-[#DCDCDC] rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Company Address</label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className="w-full mt-1 bg-white border border-[#DCDCDC] rounded-md px-3 py-2"
            />
          </div>
        </div>
        <div className="gap-2 flex-col flex ">
          <label className="text-sm font-medium">TimeZone</label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="w-32 mt-1 bg-white border border-[#DCDCDC] rounded-md px-3 py-2"
          >
            <option>UTC</option>
            <option>GMT</option>
            <option>IST</option>
            <option>PST</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="bg-[#3893D0] text-white px-5 py-2 mt-5 rounded-md hover:bg-blue-800"
        >
          Save General Settings
        </button>
      </div>
    </div>
  );
}
