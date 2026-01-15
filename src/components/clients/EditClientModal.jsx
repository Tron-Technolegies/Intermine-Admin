import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useEditClient } from "../../hooks/useClients";

export default function EditClientModal({ onClose, client }) {
  const [watchers, setWatchers] = useState([]);
  const { isPending, mutate } = useEditClient();

  //functions for Watchers
  function addWatchers() {
    setWatchers([...watchers, { link: "", coin: "" }]);
  }
  function updateWatchers(index, field, value) {
    const updated = [...watchers];
    updated[index][field] = value;
    setWatchers(updated);
  }
  function removeWatchers(index) {
    setWatchers(watchers.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("watcher", JSON.stringify(watchers));
    formData.append("userId", client?._id);
    const data = Object.fromEntries(formData);
    mutate({ data });
    onClose();
  }

  useEffect(() => {
    if (client) {
      setWatchers(client.watcherLinks);
    }
  }, [client]);

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
          Edit Client
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-700">Client Name</label>
            <input
              type="text"
              name="name"
              defaultValue={client?.clientName}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Client ID</label>
            <input
              type="text"
              name="clientId"
              defaultValue={client?.clientId}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              defaultValue={client?.companyName}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={client?.email}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              defaultValue={client?.address?.street}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
            />
          </div>
          {/* watcher links */}
          <div className="mb-2 flex flex-col">
            <label className="text-sm text-gray-700">Watcher Links</label>
            {watchers?.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 my-1 mb-4">
                <input
                  type="text"
                  value={item.link}
                  onChange={(e) =>
                    updateWatchers(index, "link", e.target.value)
                  }
                  placeholder="Enter the watcher link"
                  className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
                />
                <input
                  type="text"
                  value={item.coin}
                  onChange={(e) =>
                    updateWatchers(index, "coin", e.target.value)
                  }
                  placeholder="Enter the specific coin"
                  className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
                />
                <button
                  type="button"
                  className="px-2 py-2 rounded-md bg-red-700 text-white"
                  onClick={() => removeWatchers(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="px-2 mt-3 py-2 rounded-md bg-indigo-500 text-white"
              onClick={() => addWatchers()}
            >
              Add New Watcher
            </button>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-[#1C2340] hover:bg-[#141A32] text-white mt-4 py-2 rounded-md"
          >
            Edit Client
          </button>
        </form>
      </div>
    </div>
  );
}
