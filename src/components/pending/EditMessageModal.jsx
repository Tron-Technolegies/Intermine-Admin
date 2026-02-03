import React from "react";
import {
  useEditPendingMessage,
  useGetSinglePendingMessage,
} from "../../hooks/useMessageActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
export default function EditMessageModal({ open, handleClose, id }) {
  const { isError, isLoading, data } = useGetSinglePendingMessage({ id });
  console.log(data);

  const { isPending, mutateAsync } = useEditPendingMessage();
  return isLoading ? (
    <Loading />
  ) : (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Message
        </Typography>
        <form
          className="flex flex-col gap-2 mt-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const actdata = Object.fromEntries(formData);
            actdata.id = data._id;
            actdata.serviceProviderId = data.serviceProviderId;
            await mutateAsync(actdata);
            handleClose();
          }}
        >
          <label className="text-xs font-medium">Message</label>
          <input
            type="text"
            name="message"
            defaultValue={data.message}
            className="p-2 rounded-md text-sm shadow-md outline-none bg-neutral-100"
            placeholder=""
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="p-2 bg-blue-900 hover:bg-blue-800 cursor-pointer text-white rounded-md mt-2"
          >
            {isPending ? "Updating...." : "Update Message"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
