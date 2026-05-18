import React, { useEffect, useState } from "react";
import { useGetNoHostingMiners } from "../../hooks/adminFarms/useFarms";
import Loading from "../Loading";
import { FaMicrochip } from "react-icons/fa";
import { ImPowerCord } from "react-icons/im";
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

export default function NoHostingSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const { isError, isLoading, data } = useGetNoHostingMiners({
    search: debounced,
    currentPage: currentPage,
  });
  const miners = data?.miners;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 600);

    return () => clearTimeout(handler);
  }, [search]);
  return (
    <div className="p-3 rounded-md bg-[#F5F5F5] shadow-md cursor-pointer my-5">
      <div className="flex justify-between item-center">
        <p className="font-semibold text-lg">{"No Hosting"}</p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-3 grid md:grid-cols-3 grid-cols-2 md:gap-3 gap-5 place-items-center-safe py-2 border-b border-t border-gray-300">
            <div className="flex gap-2 items-center w-full justify-center">
              <ImPowerCord size={28} />
              <p className="flex flex-col">
                <span className="font-bold">{data.totalPower / 1000} KW</span>
                <span className="text-xs">Current Power</span>
              </p>
            </div>
            <div className="flex gap-2 items-center w-full justify-center">
              <FaMicrochip size={28} />
              <p className="flex flex-col">
                <span className="font-bold">{data.totalMiners}</span>
                <span className="text-xs">Total Miners</span>
              </p>
            </div>
            <button
              onClick={(e) => {
                // e.stopPropagation();
                setOpen(true);
              }}
              className="bg-blue-500 text-white flex justify-center items-center gap-1 hover:bg-blue-700"
            >
              <FaMicrochip />
              Miners
            </button>
          </div>
          <MinersPopup
            miners={miners}
            open={open}
            handleClose={() => setOpen(false)}
            currentPage={currentPage}
            setCurrrentPage={setCurrentPage}
            totalPages={data.totalPages}
            search={search}
            setSearch={setSearch}
          />
        </>
      )}
    </div>
  );
}

function MinersPopup({
  miners,
  open,
  handleClose,
  currentPage,
  setCurrrentPage,
  totalPages,
  search,
  setSearch,
}) {
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        //   setSelected([]);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <input
          type="search"
          placeholder="search..."
          className="p-2 rounded-md bg-gray-100 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
                  Power (Watt)
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
              {miners?.map((item, index) => {
                return (
                  <TableRow
                    key={item._id}
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
                      <p
                        className={`px-2 py-1 w-fit mx-auto rounded-md bg-blue-500 text-white`}
                      >
                        {" "}
                        {item.status}
                      </p>
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
        {totalPages > 1 && (
          <div className="flex gap-2 items-center mx-auto mt-5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrrentPage(currentPage - 1)}
              className="p-2 rounded-md text-black border px-4 bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Prev
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => setCurrrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md text-black border px-4 bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        )}
      </Box>
    </Modal>
  );
}
