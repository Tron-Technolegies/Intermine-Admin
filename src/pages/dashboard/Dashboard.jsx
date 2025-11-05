import React from "react";

import { FiCpu, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import StatsCard from "../../components/overview/StatsCard";
import DashboardChart from "../../components/overview/DashboardChart";
import ActiveMiners from "../../components/overview/ActiveMiners";
import RecentIssues from "../../components/overview/RecentIssues";
import { TbCancel } from "react-icons/tb";

export default function Dashboard() {
  return (
    <div className="space-y-6 ">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back, Admin. Here’s what’s happening today.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Total Miners" value="1,284" icon={<FiCpu />} />
        <StatsCard title="Miners Online" value="5" icon={<FiCheckCircle />} />
        <StatsCard title="Offline Miners" value="2" icon={<TbCancel />} />
        <StatsCard title="Pending Issues" value="23" icon={<FiAlertTriangle />} />
      </div>

      {/* Chart Section */}
      <DashboardChart />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <ActiveMiners />
        <RecentIssues />
      </div>
    </div>
  );
}
