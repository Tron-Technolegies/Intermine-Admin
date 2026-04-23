import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useClientsForModels } from "../../hooks/adminMiner/useMinerModels";
import Loading from "../Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  maxHeight: 500,
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function ModelUsers({ id, open, handleClose }) {
  const { isLoading, isError, data } = useClientsForModels({ id });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h4>Total Machines: {data.totalMiners}</h4>
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
              <Table sx={{}} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
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
                      Total Miners
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ background: "#eff6ff" }}>
                  {data?.clients?.map((item, index) => {
                    return (
                      <TableRow
                        key={item.clientId}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
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
                          {item.count}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Modal>
  );
}
