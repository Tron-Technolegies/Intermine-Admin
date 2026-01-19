import React from "react";
import { GoCpu } from "react-icons/go";
import PieDiagram from "./PieDiagram";

export default function AllFarmPreview({ farms }) {
  console.log(farms);

  return (
    <div className="p-3 bg-neutral-200 rounded-md flex flex-col gap-3">
      <p
      // className={`${
      //   farm.farmStatus === "online"
      //     ? "bg-green-200 text-green-900"
      //     : "bg-red-200 text-red-900"
      // } w-fit p-1 px-2 rounded-md text-sm`}
      >
        {/* {farm.farmStatus} */}
      </p>
      <div className="flex justify-between">
        <p className="text-blue-700 font-semibold text-xl">{"All Farms"}</p>

        <p>
          Capacity:{" "}
          <span className="font-semibold text-xl">
            {farms?.currentCapacity}KW / {farms?.totalCapacity} KW
          </span>
        </p>
      </div>
      <PieDiagram
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
      />
    </div>
  );
}
