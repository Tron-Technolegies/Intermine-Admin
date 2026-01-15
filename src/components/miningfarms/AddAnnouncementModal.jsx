import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAddAnnouncement } from "../../hooks/adminFarms/useAddAnnouncement";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export const AddAnnouncementModal = ({ open, handleClose, farms }) => {
  const { isPending, mutateAsync } = useAddAnnouncement();

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    await mutateAsync(data);
    handleClose();
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add an Announcement
        </Typography>
        <form className="mt-5 flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="text-xs font-semibold">Farm</label>
          <select
            name="farmId"
            required
            className="p-2 rounded-md outline-none shadow-md bg-neutral-100"
          >
            {farms?.length > 0 &&
              farms.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.farm}
                </option>
              ))}
          </select>
          <label className="text-xs font-semibold">Message</label>
          <textarea
            required
            name="message"
            placeholder="Enter your message"
            rows={3}
            className="p-2 rounded-md outline-none shadow-md bg-neutral-100"
          />
          <label className="text-xs font-semibold">Start Time</label>
          <input
            required
            name="startAt"
            type="datetime-local"
            className="p-2 rounded-md outline-none shadow-md bg-neutral-100"
          />
          <label className="text-xs font-semibold">End Time</label>
          <input
            required
            name="endAt"
            type="datetime-local"
            className="p-2 rounded-md outline-none shadow-md bg-neutral-100"
          />
          <button
            type="submit"
            disabled={isPending}
            className="p-2 bg-blue-900 text-white rounded-md mt-3"
          >
            {isPending ? "Sending...." : "Send Announcement"}
          </button>
        </form>
      </Box>
    </Modal>
  );
};
