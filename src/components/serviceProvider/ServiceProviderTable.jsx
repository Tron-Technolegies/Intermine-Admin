import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetServiceProviders } from "../../hooks/useServiceProvider";
import Loading from "../Loading";
import EditServiceProviderModal from "./EditServiceProviderModal";

export default function ServiceProviderTable() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedId("");
  };

  const { isLoading, data, isError } = useGetServiceProviders();
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>There is something wrong</p>
  ) : (
    <>
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
                Service Provider
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Contact
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
            {data?.map((item) => {
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
                    {item.name}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.email}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.contact}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    <button
                      onClick={() => {
                        handleOpen();
                        setSelectedId(item._id);
                      }}
                      className="p-2 bg-blue-900 rounded-md text-white cursor-pointer hover:bg-blue-800 "
                    >
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <EditServiceProviderModal
        open={open}
        handleClose={handleClose}
        id={selectedId}
      />
    </>
  );
}
