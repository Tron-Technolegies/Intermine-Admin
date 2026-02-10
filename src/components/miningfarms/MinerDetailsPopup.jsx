import React, { useEffect, useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import { useBulkUpdateStatus } from "../../hooks/adminFarms/useBulkUpdateStatus";
import useFarms from "../../hooks/adminFarms/useFarms";
import { useBulkMoveFarm } from "../../hooks/adminFarms/useBulkMoveFarm";

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

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 500,
  bgcolor: "background.paper",
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};
export default function MinerDetailsPopup({ open, handleClose, farm }) {
  const [selected, setSelected] = useState([]);

  const isSelected = (id) => selected.includes(id.toString());

  const { isError, isLoading, error, data } = useGetFarmMiners({
    farmId: farm?._id,
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data?.miners?.map((m) => m._id.toString());
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x.toString() !== id.toString())
        : [...prev, id.toString()],
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setSelected([]);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          All Miners in Farm
        </Typography>
        {selected.length > 0 && (
          <div className="flex gap-3 item-center justify-end">
            <ChangeStatusModal
              selected={selected}
              setSelected={setSelected}
              farmId={farm?._id}
            />
            <ChangeFarmModal
              selected={selected}
              setSelected={setSelected}
              farm={farm}
            />
          </div>
        )}
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < data?.miners?.length
                      }
                      checked={
                        data?.miners?.length > 0 &&
                        selected.length === data?.miners?.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
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
                  const checked = isSelected(item._id.toString());
                  return (
                    <TableRow
                      key={item._id}
                      hover
                      selected={checked}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={checked}
                          onChange={() => handleRowSelect(item._id.toString())}
                        />
                      </TableCell>
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
                        <p
                          className={`px-2 py-1 w-fit mx-auto rounded-md ${item.status === "online" ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}`}
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
        )}
      </Box>
    </Modal>
  );
}

function ChangeStatusModal({ selected, setSelected, farmId }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("offline");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isPending, mutateAsync } = useBulkUpdateStatus();
  return (
    <React.Fragment>
      {selected.length > 0 && (
        <Button onClick={handleOpen}>Change Status</Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style2 }}>
          <h2 className="text-lg font-semibold">Change Status</h2>
          <p className="text-sm font-light text-gray-400">
            Change the status of the selected miners
          </p>
          <form
            className="my-5 flex flex-col gap-2 text-xs"
            onSubmit={async (e) => {
              e.preventDefault();
              const data = { status, miners: selected, farmId };
              await mutateAsync(data);
              setSelected([]);
              handleClose();
            }}
          >
            <label className="">Miner status</label>
            <select
              className="p-2 rounded-md bg-neutral-100 shadow-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={"offline"}>Offline</option>
              <option value={"online"}>Online</option>
            </select>
            <button
              disabled={isPending}
              className="bg-blue-700 text-white mt-1"
            >
              {isPending ? "......" : " Change Status"}
            </button>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function ChangeFarmModal({ selected, setSelected, farm }) {
  const [open, setOpen] = useState(false);
  const [farms, setFarms] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isLoading, data } = useFarms();
  const { isPending, mutateAsync } = useBulkMoveFarm();

  useEffect(() => {
    if (data) {
      setFarms(data.filter((item) => item.farm !== farm?.farm));
    }
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.oldFarmId = farm?._id;
    data.miners = selected;
    await mutateAsync(data);
    setSelected([]);
    handleClose();
  }
  return (
    <React.Fragment>
      {selected.length > 0 && <Button onClick={handleOpen}>Move Farm</Button>}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style2 }}>
          <h2 className="text-lg font-semibold">Move Farm</h2>
          <p className="text-sm font-light text-gray-400">
            Move all the selected miners to a different Farm
          </p>
          <form
            className="mt-5 flex flex-col gap-2 text-xs"
            onSubmit={handleSubmit}
          >
            <label>Move To</label>
            <select
              name="newFarmId"
              className="p-2 rounded-md bg-neutral-100 shadow-md"
            >
              {farms?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.farm}
                </option>
              ))}
            </select>
            <button
              disabled={isPending}
              className="bg-blue-700 text-white mt-1"
            >
              {isPending ? "....." : "Confirm"}
            </button>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
