import React, { useEffect, useState } from "react";
import { GoCpu } from "react-icons/go";
import PieDiagram from "./PieDiagram";

export default function AllFarmPreview({ farms }) {
  const [capacity, setCapacity] = useState(0);
  const [current, setCurrent] = useState(0);
  const [totalMiners, setTotalMiners] = useState(0);
  const [hydro, setHydro] = useState(0);
  const [immersion, setImmersion] = useState(0);
  const [aircooled, setAirCooled] = useState(0);
  const [active, setActive] = useState(0);
  const [offline, setOffline] = useState(0);
  const [planned, setPlanned] = useState(0);
  const [inBuilding, setInBuilding] = useState(0);

  useEffect(() => {
    if (farms) {
      setCapacity(farms.reduce((sum, item) => sum + Number(item.capacity), 0));
      setCurrent(farms.reduce((sum, item) => sum + item.current, 0));
      setTotalMiners(farms.reduce((sum, item) => sum + item.miners.length, 0));
      const AllTypes = farms.flatMap((item) => {
        return item.farmType.split(",").map((t) => t.trim());
      });

      setHydro(AllTypes?.filter((item) => item === "Hydro").length);
      setImmersion(AllTypes?.filter((item) => item === "Immersion").length);
      setAirCooled(AllTypes?.filter((item) => item === "Air Cooled").length);
      setActive(farms.filter((item) => item.farmStatus === "Active").length);
      setOffline(farms.filter((item) => item.farmStatus === "Offline").length);
      setPlanned(farms.filter((item) => item.farmStatus === "Planned").length);
      setInBuilding(
        farms.filter((item) => item.farmStatus === "In-Building").length,
      );
    }
  }, [farms]);
  return (
    <div className="p-3 bg-neutral-100 rounded-md flex flex-col gap-3 my-3">
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 place-items-center p-3 shadow-md  gap-2">
        <div className="bg-blue-200 p-5 sm:w-[250px] w-full rounded-md flex flex-col gap-3 items-center">
          <p className="font-semibold text-green-800">Total Farms</p>
          <p className="font-black text-4xl text-green-500">{farms?.length}</p>
        </div>
        <div className="bg-blue-200 p-5 sm:w-[250px] w-full rounded-md flex flex-col gap-3 items-center">
          <p className="font-semibold text-blue-800">Total Capacity</p>
          <p className="font-black text-4xl text-blue-500">
            {capacity / 1000} KW
          </p>
        </div>
        <div className="bg-blue-200 p-5 sm:w-[250px] w-full rounded-md flex flex-col gap-3 items-center">
          <p className="font-semibold text-yellow-800">Current Capacity</p>
          <p className="font-black text-4xl text-yellow-500">
            {current / 1000} KW
          </p>
        </div>
        <div className="bg-blue-200 p-5 sm:w-[250px] w-full rounded-md flex flex-col gap-3 items-center">
          <p className="font-semibold text-violet-800">Total Miners</p>
          <p className="font-black text-4xl text-violet-500">{totalMiners}</p>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="mt-3 w-full shadow-md p-5 rounded-md">
          <p className="text-lg font-semibold">Capacity</p>
          <PieDiagram
            content={[
              {
                label: `Current (${current / 1000} KW)`,
                value: ((current / capacity) * 100).toFixed(2),
                color: " oklch(79.5% 0.184 86.047)",
              },
              {
                label: `Remaining (${(capacity - current) / 1000} KW)`,
                value: (100 - (current / capacity) * 100).toFixed(2),
                color: "#4D96FF",
              },
            ]}
          />
        </div>
        <div className="mt-3 w-full shadow-md p-5 rounded-md ">
          <p className="text-lg font-semibold">Farm Types</p>
          <PieDiagram
            content={[
              {
                label: `Air Cooled (${aircooled})`,
                value: (
                  (aircooled / (aircooled + hydro + immersion)) *
                  100
                ).toFixed(2),
                color: "oklch(90.5% 0.182 98.111)",
              },
              {
                label: `Hydro (${hydro})`,
                value: (
                  (hydro / (aircooled + hydro + immersion)) *
                  100
                ).toFixed(2),
                color: "oklch(80.9% 0.105 251.813)",
              },

              {
                label: `Immersion (${immersion})`,
                value: (
                  (immersion / (aircooled + hydro + immersion)) *
                  100
                ).toFixed(2),
                color: "#7bf1a8",
              },
            ]}
          />
        </div>
      </div>
      <div className="mt-3 w-full shadow-md p-5 rounded-md ">
        <p className="text-lg font-semibold">Farm Status</p>
        <PieDiagram
          content={[
            {
              label: `Offline (${offline})`,
              value: ((offline / farms?.length) * 100).toFixed(2),
              color: "oklch(70.4% 0.191 22.216)",
            },
            {
              label: `Active (${active})`,
              value: ((active / farms?.length) * 100).toFixed(2),
              color: "#05df72",
            },
            {
              label: `Planned (${planned})`,
              value: ((planned / farms?.length) * 100).toFixed(2),
              color: "oklch(70.7% 0.165 254.624)",
            },
            {
              label: `In-Building (${inBuilding})`,
              value: ((inBuilding / farms?.length) * 100).toFixed(2),
              color: "oklch(75% 0.183 55.934)",
            },
          ]}
        />
      </div>
    </div>
  );
}
