import React from "react";
import { FiDownload, FiSend } from "react-icons/fi";
import Loading from "../Loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function AgreementTable({
  data,
  isLoading,
  page,
  totalPages,
  setPage,
}) {
  if (isLoading) return <Loading />;

  const agreements = data || [];

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-4 mt-6 max-w-[90vw]">
      <h2 className="text-lg font-semibold mb-2">User Agreement Status</h2>
      <p className="text-sm text-gray-600 mb-3">
        Track which users have signed agreements and manage electronic
        signatures.
      </p>

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
                User
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Agreement
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Send Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Signed Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Status
              </TableCell>
              {/* <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#eff6ff" }}>
            {agreements?.map((item) => {
              const sentDate = new Date(item.issuedOn).toLocaleDateString();
              const signedDate = item.signed
                ? new Date(item.updatedAt).toLocaleDateString()
                : "---";
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
                    {item.user?.clientName || "Unknown"}
                    <p className="text-xs text-gray-500">
                      {item.user?.clientId}
                    </p>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.agreementType} Agreement
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {sentDate}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {signedDate}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.signed ? "Signed" : "Pending"}
                  </TableCell>
                  {/* <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    <div className="flex justify-center">
                      {item.signed ? (
                        <FiDownload
                          size={18}
                          className="cursor-pointer hover:text-blue-500"
                        />
                      ) : (
                        <FiSend
                          size={18}
                          className="cursor-pointer hover:text-blue-500"
                        />
                      )}
                    </div>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="py-2">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
