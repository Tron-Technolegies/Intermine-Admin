import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function NotifyTechnicianModal({ open, onClose, issue, onNotify, loading }) {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (issue) {
      setEmail(issue.technicianEmail || "");
      setNotes("");
    }
  }, [issue]);

  const handleSubmit = () => {
    if (!email.trim()) {
      return;
    }

    onNotify({
      issueId: issue._id,
      email: email.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Notify Technician</DialogTitle>

      <DialogContent className="flex flex-col gap-4 pt-4">
        <TextField
          label="Technician / Hosting Company Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Add any additional information for the technician..."
        />

        {issue?.technicianNotified && (
          <p className="text-sm text-gray-500">
            Previously notified: {issue.technicianEmail || "Unknown email"}
            {issue.notifiedAt && ` on ${new Date(issue.notifiedAt).toLocaleString()}`}
          </p>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button onClick={handleSubmit} variant="contained" disabled={loading || !email.trim()}>
          {loading ? "Sending..." : "Notify Technician"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
