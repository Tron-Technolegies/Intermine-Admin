import React from "react";
import { Link } from "react-router-dom";

export default function SingleMinerPage() {
  return (
    <div>
      <div className="p-6 border-b border-[#DCDCDC] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Miner</h1>
          <p className="text-md text-gray-500">
            Manage all mining equipment and monitor performance
          </p>
        </div>

        <Link
          to={"/miners"}
          className="bg-[#3893D0] hover:bg-[#2c7cb5] text-white rounded-xl px-4 py-1 transition-all"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
