import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchFilterBar from "../../components/SearchFilterBar";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function OfflineMiners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  // Backend is always limit = 15
  const rowsPerPage = 15;

  const OfflineStatusDropdown = () => (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
    >
      <option value="All Status">All Status</option>
      <option value="offline">Offline</option>
      <option value="repair">Under Repair</option>
      <option value="warranty">Under Warranty</option>
      <option value="network">Network Issue</option>
      <option value="psu">PSU Issue</option>
    </select>
  );

  // FETCH MINERS
  const { data, isLoading, isError } = useQuery({
    queryKey: ["offlineMiners", currentPage, searchTerm, statusFilter],
    queryFn: async () => {
      const res = await api.get(`/api/v1/admin/miner/offline`, {
        params: {
          currentPage,
          query: searchTerm,
          status: statusFilter === "All Status" ? "" : statusFilter,
        },
      });

      return res.data;
    },
    keepPreviousData: true,
  });

  const miners = data?.miners || [];
  const totalPages = data?.totalPages || 1;

  // Since backend does NOT return totalMiners, we calculate it:
  const totalCount = totalPages * rowsPerPage;

  const getStatusBadge = (status) => {
    const colors = {
      offline: "bg-yellow-100 text-yellow-700",
      Warranty: "bg-blue-100 text-blue-700",
      Pending: "bg-purple-100 text-purple-700",
      repair: "bg-purple-100 text-purple-700",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); // backend is 1-based
  };

  return (
    <div className="max-w-[100vw]">
      <PageHeader
        title="Offline Miners"
        subtitle="Monitor and manage miners that are currently offline or disconnected."
      />

      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={(v) => {
          setCurrentPage(1);
          setSearchTerm(v);
        }}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        customDropdown={<OfflineStatusDropdown />}
      />

      {isLoading && (
        <div className="flex justify-center mt-6">
          <CircularProgress />
        </div>
      )}

      {isError && <p className="text-center text-red-500 mt-6">Failed to load miners</p>}

      {!isLoading && !isError && (
        <Paper
          className="mt-4 w-full rounded-xl shadow-sm border border-gray-200"
          sx={{ width: "100%", overflow: "hidden" }}
        >
          <TableContainer sx={{ maxHeight: "70vh", overflowX: "auto" }}>
            <Table
              stickyHeader
              size="small"
              sx={{ minWidth: 800 }}
              aria-label="offline miners table"
            >
              <TableHead>
                <TableRow>
                  {[
                    "SL No",
                    "Owner",
                    "Model",
                    "Status",
                    "Issue",
                    "Mining Farm",
                    "Provider",
                    "Message",
                  ].map((head) => (
                    <TableCell
                      key={head}
                      className="bg-gray-50 text-gray-600 font-semibold"
                      sx={{ fontWeight: "bold", color: "#4b5563", whiteSpace: "nowrap" }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {miners.map((m) => (
                  <TableRow hover key={m._id}>
                    <TableCell>{m.serialNumber}</TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {m.client?.clientName}{" "}
                      <span className="text-xs text-gray-400">({m.client?.clientId})</span>
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>{m.model}</TableCell>

                    <TableCell>
                      <span
                        className={`${getStatusBadge(
                          m.status
                        )} px-3 py-1 rounded-full text-xs whitespace-nowrap`}
                      >
                        {m.status}
                      </span>
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {m.currentIssue?.issue?.issueType || "-"}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>{m.location}</TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>{m.serviceProvider}</TableCell>

                    <TableCell sx={{ minWidth: 200 }}>
                      {m.currentIssue ? (
                        <>
                          {m.currentIssue.status}
                          <span className="text-[10px] text-gray-400 block whitespace-nowrap">
                            {new Date(m.currentIssue.updatedAt).toLocaleTimeString()}
                          </span>
                        </>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                {miners.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography sx={{ py: 2 }} color="textSecondary">
                        No offline miners found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]} // fixed by backend
            count={totalCount}
            page={currentPage - 1}
            onPageChange={handleChangePage}
          />
        </Paper>
      )}
    </div>
  );
}
