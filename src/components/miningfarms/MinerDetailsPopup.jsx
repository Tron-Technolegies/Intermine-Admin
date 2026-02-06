import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useGetFarmMiners } from "../../hooks/adminFarms/useFarmsMiners";
import Loading from "../Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxHeight: 500,
  bgcolor: "background.paper",
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function MinerDetailsPopup({ open, handleClose, farm }) {
  const { isError, isLoading, error, data } = useGetFarmMiners({
    farmId: farm?._id,
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          All Miners in Farm
        </Typography>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
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
                    Worker Id
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Miner Model
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Client Name
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
                    Power (KW)
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
                {data?.miners?.map((item, index) => {
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
                        {item.workerId}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ textAlign: "center" }}
                      >
                        {`${item.manufacturer} ${item.model}`}
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
                        sx={{ textAlign: "center" }}
                      >
                        {item.status}
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
                        <Link
                          className="p-2 bg-blue-500 text-white rounded-md"
                          to={`/miners/${item._id}`}
                        >
                          Insights
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Modal>
  );
}
