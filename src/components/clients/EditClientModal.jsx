import React from "react";
import { IoClose } from "react-icons/io5";

export default function EditClientModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
      // onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl p-6 w-[420px] shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Add New Client
        </h2>

        <form className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-700">Client Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Client ID</label>
            <input
              type="text"
              name="clientId"
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="isAgreement"
              //   checked={agreement}
              //   onChange={(e) => setAgreement(e.target.checked)}
              className="accent-blue-600"
            />
            <label className="text-sm text-gray-700">
              Include Mining Agreement
            </label>
          </div>

          <button
            type="submit"
            // disabled={createClientMutation.isPending}
            className="bg-[#1C2340] hover:bg-[#141A32] text-white mt-4 py-2 rounded-md"
          >
            {/* {createClientMutation.isPending ? "Creating..." : "Add Client"} */}
          </button>
        </form>
      </div>
    </div>
  );
}
