import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5"; // 👈 added

export default function EditMinerModal({ minerData, onClose }) {
  const [formData, setFormData] = useState(minerData || {});

  useEffect(() => {
    if (minerData) setFormData(minerData);
  }, [minerData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Miner:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-black/30 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-[400px] max-h-[500px] overflow-y-auto">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition-all"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">Edit Miner Details</h2>
        <p className="text-sm text-gray-500 mb-5">Update the existing miner record.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {Object.keys(formData).map(
            (key) =>
              key !== "serviceProvider" && (
                <div key={key}>
                  <label className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  {typeof formData[key] === "boolean" ? (
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                      className="ml-2"
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  )}
                </div>
              )
          )}

          <div>
            <label className="text-sm text-gray-700">Service Provider</label>
            <p className="text-blue-600 font-medium mt-1">{formData.serviceProvider}</p>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 border px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
