import React, { useEffect, useState } from "react";
import { GoCpu } from "react-icons/go";
import PieDiagram from "./PieDiagram";

export default function AllFarmPreview({ farms }) {
  const [capacity, setCapacity] = useState(0);
  const [current, setCurrent] = useState(0);
  const [totalMiners, setTotalMiners] = useState(0);

  useEffect(() => {
    if (farms) {
      setCapacity(farms.reduce((sum, item) => sum + Number(item.capacity), 0));
      setCurrent(farms.reduce((sum, item) => sum + item.current, 0));
      setTotalMiners(farms.reduce((sum, item) => sum + item.miners.length, 0));
    }
  }, [farms]);
  return (
    <div className="p-3 bg-neutral-200 rounded-md flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-blue-200 p-5 w-[250px] rounded-md flex flex-col gap-3 items-center">
          <p className="font-semibold text-green-800">Total Farms</p>
          <p className="font-black text-4xl text-green-500">{farms?.length}</p>
          <div className="text-sm text-green-800">
            <p>
              Active:{" "}
              {farms?.filter((item) => item.farmStatus === "Active").length}
            </p>
            <p>
              Offline:{" "}
              {farms?.filter((item) => item.farmStatus === "Offline").length}
            </p>
          </div>
        </div>
        <div className="bg-blue-200 p-5 w-[250px] rounded-md flex flex-col gap-3 items-center">
          <p className="font-semibold text-blue-800">Total Capacity</p>
          <p className="font-black text-4xl text-blue-500">{capacity} KW</p>
        </div>
        <div className="bg-blue-200 p-5 w-[250px] rounded-md flex flex-col gap-3 items-center">
          <p className="font-semibold text-yellow-800">Current Capacity</p>
          <p className="font-black text-4xl text-yellow-500">{current} KW</p>
        </div>
        <div className="bg-blue-200 p-5 w-[250px] rounded-md flex flex-col gap-3 items-center">
          <p className="font-semibold text-violet-800">Total Miners</p>
          <p className="font-black text-4xl text-violet-500">{totalMiners}</p>
        </div>
      </div>

      {/* <PieDiagram
        content={[
          {
            label: "Current",
            value: (
              (farms?.currentCapacity / farms?.totalCapacity) *
              100
            ).toFixed(2),
          },
          {
            label: "Remaining",
            value: (
              100 -
              (farms?.currentCapacity / farms?.totalCapacity) * 100
            ).toFixed(2),
          },
        ]}
      /> */}
    </div>
  );
}
