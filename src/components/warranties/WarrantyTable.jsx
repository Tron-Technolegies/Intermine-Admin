import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import UpdateWarrantyModal from "./UpdateWarrantyModal";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function WarrantyTable({
  data,
  isLoading,
  search,
  setSearch,
  page,
  setPage,
  totalPages,
}) {
  const [editItem, setEditItem] = useState(null);

  const calcDaysRemaining = (endDate) => {
    const diff = dayjs(endDate).diff(dayjs(), "day");
    return diff + " days";
  };

  const getStatus = (endDate) => {
    const days = dayjs(endDate).diff(dayjs(), "day");
    if (days < 0) return "Expired";
    if (days <= 30) return "Expiring Soon";
    return "Active";
  };

  return (
    <div className="mt-10 bg-[#F5F5F5] lg:p-5 p-3 rounded-2xl shadow-sm max-w-[90vw]">
      <p className="text-xl font-semibold">All Warranties</p>
      <p className="text-gray-500 mb-4 text-sm">
        View and manage warranty information for all miners.
      </p>

      {/* SEARCH BAR */}
      <div className="flex w-full p-3 border border-[#DCDCDCDC] rounded-xl mb-5 gap-2 bg-white text-[#787878]">
        <CiSearch className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search warranties by Miner ID, Model or Owner"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Miner
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Client
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Start Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                End Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Days Remaining
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#eff6ff" }}>
            {!isLoading &&
              data?.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item.miner?.model}
                      <br />
                      <span className="text-xs text-gray-500">
                        SN: {item.miner?.serialNumber}
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item.user?.clientName}
                      <br />
                      <span className="text-xs text-gray-500">
                        {item.user?.clientId}
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item.warrantyType}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {dayjs(item.startDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {dayjs(item.endDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {calcDaysRemaining(item.endDate)}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          getStatus(item.endDate) === "Active"
                            ? "bg-green-600"
                            : getStatus(item.endDate) === "Expired"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {getStatus(item.endDate)}
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      <div className="flex justify-center">
                        <FiEdit
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => setEditItem(w)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  No Warranties Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-2 py-2 font-medium">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* UPDATE WARRANTY MODAL */}
      {editItem && (
        <UpdateWarrantyModal
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
    </div>
  );
}
