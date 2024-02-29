import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {
  getEventsInRange,
  formatDate,
  mapEventDescription,
} from "../../../../util";
import { updateLeaseEventExecutionDate } from "../../../../api";
import { DateTime } from "luxon";

function EventManager({ buildings, refreshBuildings }) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const currentDateISO = new Date().toISOString();
    const events = getEventsInRange(buildings, currentDateISO);
    setUpcomingEvents(events);
  }, [buildings]);

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
    setNote("");
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleComplete = () => {
    if (selectedEvent) {
      handleUpdateLeaseEventExecutionDate(
        selectedEvent.event.id,
        DateTime.now().toISODate(),
        note
      );
      handleCloseDialog();
    }
  };

  const handleUpdateLeaseEventExecutionDate = (
    eventId,
    executionDate,
    note
  ) => {
    updateLeaseEventExecutionDate({
      id: eventId,
      execution_date: executionDate,
      note: note,
    })
      .then(() => {
        refreshBuildings();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {upcomingEvents.length === 0 ? (
        <Typography variant="h6">No upcoming events.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="upcoming events table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Property</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Due Date</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Event</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {event.fqPropertyName}
                  </TableCell>
                  <TableCell>{formatDate(event.event.due_date)}</TableCell>
                  <TableCell>
                    {mapEventDescription(event.event.description)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(event)}
                    >
                      <CheckIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxWidth: "500px" } }}
      >
        <DialogTitle>{selectedEvent?.fqPropertyName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mapEventDescription(selectedEvent?.event.description)}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Optional Note"
            type="text"
            fullWidth
            variant="outlined"
            value={note}
            onChange={handleNoteChange}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleComplete} variant="contained">
            Complete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EventManager;
