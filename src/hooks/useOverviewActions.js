import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useOverviewActions(type = "month") {
  // ===== FETCH ADMIN STATS =====
  const statsQuery = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/extra/stats");
      return res.data;
    },
  });

  // =====  FETCH GRAPH DATA =====
  const graphQuery = useQuery({
    queryKey: ["admin-graph", type],
    queryFn: async () => {
      const res = await api.get(`/api/v1/admin/extra/graph?type=${type}`);
      return formatGraph(res.data);
    },
  });

  // =====FETCH ACTIVE MINERS (limit 4) =====
  const minersQuery = useQuery({
    queryKey: ["dashboard-miners"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/miner", {
        params: {
          currentPage: 1,
          limit: 4,
          status: "ALL",
          query: "",
        },
      });

      return res.data.miners?.slice(0, 4) || [];
    },
  });

  // ===== FETCH RECENT ISSUES (limit 4) =====
  const issuesQuery = useQuery({
    queryKey: ["dashboard-issues"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/issue", {
        params: {
          currentPage: 1,
          limit: 4,
          status: "ALL",
          query: "",
        },
      });

      return res.data.issues?.slice(0, 4) || [];
    },
  });

  return {
    stats: statsQuery.data,
    graph: graphQuery.data,
    miners: minersQuery.data,
    issues: issuesQuery.data,

    isLoading:
      statsQuery.isLoading ||
      graphQuery.isLoading ||
      minersQuery.isLoading ||
      issuesQuery.isLoading,

    isError: statsQuery.isError || graphQuery.isError || minersQuery.isError || issuesQuery.isError,
  };
}

// Format Graph Data
function formatGraph({ users, issues }) {
  const map = new Map();

  users.forEach((item) => {
    const d = new Date(item.createdAt);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    if (!map.has(label)) map.set(label, { users: 0, issues: 0 });
    map.get(label).users += 1;
  });

  issues.forEach((item) => {
    const d = new Date(item.createdAt);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    if (!map.has(label)) map.set(label, { users: 0, issues: 0 });
    map.get(label).issues += 1;
  });

  return Array.from(map, ([label, counts]) => ({
    label,
    users: counts.users,
    issues: counts.issues,
  }));
}
