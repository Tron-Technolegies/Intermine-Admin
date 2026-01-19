import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function PieDiagram({ content }) {
  const size = {
    width: 200,
    height: 200,
  };
  const valueFormatter = (item) => `${item.value}%`;
  const data = {
    data: content,
    valueFormatter,
  };
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.value}%`,
          arcLabelMinAngle: 35,
          arcLabelRadius: "60%",
          ...data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}
