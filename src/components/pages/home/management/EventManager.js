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
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getEventsInRange,
  formatDate,
  mapEventDescription,
} from "../../../../util";
import { updateLeaseEventExecutionDate } from "../../../../api";
import { DateTime } from "luxon";

function EventManager({ buildings, refreshBuildings }) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const currentDateISO = new Date().toISOString();
    const events = getEventsInRange(buildings, currentDateISO);
    setUpcomingEvents(events);
  }, [buildings]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleUpdateLeaseEventExecutionDate = (eventId, executionDate) => {
    updateLeaseEventExecutionDate({
      id: eventId,
      execution_date: executionDate,
    })
      .then(() => {
        refreshBuildings();
        setSnackbarOpen(true);
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
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleUpdateLeaseEventExecutionDate(
                          event.event.id,
                          DateTime.now().toISODate()
                        )
                      }
                    >
                      Complete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Task successfully completed!
        </Alert>
      </Snackbar>
    </>
  );
}

export default EventManager;
