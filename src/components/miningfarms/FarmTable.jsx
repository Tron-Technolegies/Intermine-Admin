import Loading from "../Loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function FarmTable({
  miners = [],
  isLoading,
  page,
  totalPages,
  setPage,
}) {
  if (isLoading) return <Loading />;

  if (!miners || miners.length === 0)
    return <p className="text-center mt-4 text-gray-500">No miners found</p>;

  // Calculate power usage
  const totalUsed = miners.reduce((sum, m) => sum + (m.power || 0), 0);

  return (
    <div className="bg-white rounded-xl shadow my-6">
      {/* TABLE */}
      <TableContainer component={Paper} sx={{ marginTop: 3, maxWidth: "90vw" }}>
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
                Sl No
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Mac Address
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
                Status
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                KWH
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
                    {item.serialNumber}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.macAddress}
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
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        item.status === "online" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {item.power}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* POWER STATS */}
      <div className="bg-[#EAF4FF] w-full text-[15px]">
        <div className="flex justify-between px-6 py-3 font-medium border-b border-blue-200">
          <span>Total Power Used</span> <span>{totalUsed}</span>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 py-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-medium">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
