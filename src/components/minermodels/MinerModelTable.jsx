import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGetAllMinerModels } from "../../hooks/adminMiner/useMinerModels";
import Loading from "../Loading";
import EditMinerModelPopup from "./EditMinerModelPopup";
import DeleteMinerModelPopup from "./DeleteMinerModelPopup";
import { TiArrowUnsorted } from "react-icons/ti";
export default function MinerModelTable() {
  const [search, setSearch] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [debounced, setDebounced] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { isError, isLoading, data } = useGetAllMinerModels({
    search: debounced,
    currentPage,
    sortBy,
  });

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Something Went Wrong</p>
  ) : (
    <div className="max-w-[90vw]">
      <div>
        <input
          type="search"
          value={search}
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-neutral-100 rounded-md outline-none shadow-md"
        />
      </div>
      <TableContainer component={Paper} sx={{ marginTop: 3, marginBottom: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell
                onClick={() =>
                  sortBy === "manufacturerAZ"
                    ? setSortBy("manufacturerZA")
                    : setSortBy("manufacturerAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sortBy.includes("manufacturer") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Manufacturer</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortBy === "modelAZ"
                    ? setSortBy("modelZA")
                    : setSortBy("modelAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sortBy.includes("model") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Model Name</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortBy === "powerAZ"
                    ? setSortBy("powerZA")
                    : setSortBy("powerAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sortBy.includes("power") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Power (KW)</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortBy === "hashrateAZ"
                    ? setSortBy("hashrateZA")
                    : setSortBy("hashrateAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sortBy.includes("hashrate") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Hashrate</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortBy === "coolingAZ"
                    ? setSortBy("coolingZA")
                    : setSortBy("coolingAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sortBy.includes("cooling") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Cooling Type</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortBy === "algorithmAZ"
                    ? setSortBy("algorithmZA")
                    : setSortBy("algorithmAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sortBy.includes("algorithm") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Algorithm</span>
                  <span>
                    <TiArrowUnsorted />
                  </span>
                </div>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortBy === "coinsAZ"
                    ? setSortBy("coinsZA")
                    : setSortBy("coinsAZ")
                }
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                  backgroundColor: sortBy.includes("coins") && "#F0F0F0",
                }}
              >
                <div className="flex gap-2 items-center justify-center">
                  <span>Coins</span>
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
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#eff6ff" }}>
            {data?.miners?.map((item) => {
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
                    {item.manufacturer}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.power}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.hashRate}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.coolingType}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.algorithm}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.coins}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => {
                        setSelectedId(item._id);
                        setEditForm(true);
                      }}
                      className="p-2 bg-blue-900 rounded-md text-white cursor-pointer hover:bg-blue-800 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(item._id);
                        setDeletePopup(true);
                      }}
                      className="bg-red-700 text-white"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {data.totalPages > 1 && (
        <Stack spacing={2}>
          <Pagination
            count={data.totalPages}
            page={currentPage}
            onChange={handleChange}
          />
        </Stack>
      )}
      <EditMinerModelPopup
        open={editForm}
        handleClose={() => {
          setEditForm(false);
          setSelectedId("");
        }}
        id={selectedId}
      />
      <DeleteMinerModelPopup
        open={deletePopup}
        handleClose={() => {
          setDeletePopup(false);
          setSelectedId("");
        }}
        minerId={selectedId}
      />
    </div>
  );
}
