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
export default function MinerModelTable() {
  const [search, setSearch] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [debounced, setDebounced] = useState("");
  const { isError, isLoading, data } = useGetAllMinerModels({
    search: debounced,
    currentPage,
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
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Manufacturer
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Model Name
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Power (KW)
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Hash Rate (TH/s)
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Cooling Type
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Algorithm
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Coins
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
