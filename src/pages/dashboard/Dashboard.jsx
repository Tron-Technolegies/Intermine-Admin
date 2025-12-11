import React from "react";
import { FiCpu, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { TbCancel } from "react-icons/tb";

import StatsCard from "../../components/overview/StatsCard";
import DashboardChart from "../../components/overview/DashboardChart";
import ActiveMiners from "../../components/overview/ActiveMiners";
import RecentIssues from "../../components/overview/RecentIssues";

import useOverviewActions from "../../hooks/useOverviewActions";
import Loading from "../../components/Loading";

export default function Dashboard() {
  const { stats, graph, isLoading, isError } = useOverviewActions("month");

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading dashboard data</p>;

  return (
    <div className="space-y-6 ">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back, Admin. Here’s what’s happening today.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Total Miners" value={stats.miners} icon={<FiCpu />} />
        <StatsCard title="Miners Online" value={stats.onlineMiners} icon={<FiCheckCircle />} />
        <StatsCard title="Offline Miners" value={stats.offlineMiners} icon={<TbCancel />} />
        <StatsCard title="Pending Issues" value={stats.issues} icon={<FiAlertTriangle />} />
      </div>

      {/* Chart Section */}
      <DashboardChart graphData={graph || []} />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <ActiveMiners />
        <RecentIssues />
      </div>
    </div>
  );
}
