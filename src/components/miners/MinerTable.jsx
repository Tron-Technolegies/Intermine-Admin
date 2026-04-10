import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { TiArrowUnsorted, TiTick } from "react-icons/ti";
import ReportIssueModal2 from "../overview/ReportIssueModal2";
import { UserContext } from "../../UserContext";

export default function MinerTable({ miners, sort, setSort }) {
  const [openReport, setOpenReport] = useState(false);
  const [currentMiner, setCurrentMiner] = useState(null);
  const { selectedMiner, setSelectedMiner } = useContext(UserContext);

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell
                onClick={() =>
                  sort === "minerAZ" ? setSort("minerZA") : setSort("minerAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sort.includes("miner") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Miner</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sort === "clientAZ"
                    ? setSort("clientZA")
                    : setSort("clientAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sort.includes("client") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Client</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sort === "workerAZ"
                    ? setSort("workerZA")
                    : setSort("workerAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sort.includes("worker") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Worker ID</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sort === "serialAZ"
                    ? setSort("serialZA")
                    : setSort("serialAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sort.includes("serial") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Serial No</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sort === "locationAZ"
                    ? setSort("locationZA")
                    : setSort("locationAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sort.includes("location") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Location</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
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
            {miners?.map((item) => {
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
                    {item.model}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.clientName}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      textAlign: "center",
                      maxWidth: "100px",
                      wordWrap: "break-word",
                    }}
                  >
                    {item.workerId}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.serialNumber}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.location}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        item.status === "online"
                          ? "bg-green-600"
                          : item.status === "offline"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      {selectedMiner?._id === item._id ? (
                        <button
                          onClick={() => setSelectedMiner(null)}
                          className="p-2 rounded-md bg-gray-200 text-lg text-green-700"
                        >
                          <TiTick />
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedMiner(item)}
                          className="p-2 rounded-md bg-gray-200 text-lg"
                        >
                          <IoCopyOutline />
                        </button>
                      )}

                      <button
                        className="p-2 rounded-md bg-indigo-700 text-white cursor-pointer"
                        onClick={() => {
                          setOpenReport(true);
                          setCurrentMiner(item);
                        }}
                      >
                        Report Issue
                      </button>
                      <Link
                        to={`/miners/${item._id}`}
                        className="bg-gray-300 p-2 rounded-md"
                      >
                        Details
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {openReport && (
        <ReportIssueModal2
          onClose={() => {
            setOpenReport(false);
            setCurrentMiner(null);
          }}
          currentMiner={currentMiner}
        />
      )}
    </>
  );
}
