import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function AddIssueModal({ onClose }) {
  const [issueType, setIssueType] = useState("");
  const queryClient = useQueryClient();

  const addIssueType = useMutation({
    mutationFn: (payload) => api.post("/api/v1/admin/issue/type", payload),
    onSuccess: () => {
      toast.success("Issue Type Added Successfully!");
      queryClient.invalidateQueries(["issueTypes"]);
      setIssueType("");
      onClose();
    },
    onError: (err) => {
      const message = err.response?.data?.error || "Failed to add issue type";
      toast.error(message);
    },
  });

  // Close on outside click
  // const handleOutsideClick = (e) => {
  //   if (e.target.id === "overlay") onClose();
  // };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issueType.trim()) return toast.error("Issue type cannot be empty");

    addIssueType.mutate({ issueType });
  };

  return (
    <div
      id="overlay"
      // onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl w-[92%] sm:w-96 max-h-[70vh] overflow-y-auto p-5 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          <IoClose size={18} />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Add New Issue Type
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Create a new issue type that will appear in the client report issue
          dropdown.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 p-2">
          <label className="font-medium text-gray-700">Issue Type</label>

          <input
            type="text"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            placeholder="e.g., Cooling, Maintenance..."
            className="border border-[#787878] rounded w-full p-2"
          />

          <button
            type="submit"
            disabled={addIssueType.isPending}
            className="bg-[#2B347A] p-2 rounded text-white text-center w-full mt-4 disabled:opacity-50"
          >
            {addIssueType.isPending ? "Adding..." : "Add Issue Type"}
          </button>
        </form>
      </div>
    </div>
  );
}
