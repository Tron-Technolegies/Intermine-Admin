import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function EditIssueTypeModal({ onClose, item }) {
  const [issueType, setIssueType] = useState("");
  const [adminOnly, setAdminOnly] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (item) {
      setIssueType(item.issueType);
      setAdminOnly(item.adminOnly);
    }
  }, [item]);

  const editIssueType = useMutation({
    mutationFn: (payload) => api.patch("/api/v1/admin/issue/type", payload),
    onSuccess: () => {
      toast.success("Issue Type Edited Successfully!");
      queryClient.invalidateQueries(["issueTypes"]);
      setIssueType("");
      onClose();
    },
    onError: (err) => {
      const message = err.response?.data?.error || "Failed to edit issue type";
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

    editIssueType.mutate({ issueType, adminOnly, id: item?._id });
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
        <p className="text-sm text-gray-500 mb-5">Edit the issue.</p>

        <form onSubmit={handleSubmit} className="space-y-3 p-2">
          <label className="font-medium text-gray-700">Issue Type</label>

          <input
            type="text"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            placeholder="e.g., Cooling, Maintenance..."
            className="border border-[#787878] rounded w-full p-2"
          />
          <div className="flex gap-2 items-center mt-1">
            <input
              type="checkbox"
              checked={adminOnly}
              onChange={(e) => setAdminOnly(e.target.checked)}
            />
            <label>Admin Only</label>
          </div>
          <button
            type="submit"
            disabled={editIssueType.isPending}
            className="bg-[#2B347A] p-2 rounded text-white text-center w-full mt-4 disabled:opacity-50"
          >
            {editIssueType.isPending ? "Saving..." : "Save Issue Type"}
          </button>
        </form>
      </div>
    </div>
  );
}
