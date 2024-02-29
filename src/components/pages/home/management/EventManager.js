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
} from "@mui/material";
import {
  getEventsInRange,
  formatDate,
  mapEventDescription,
} from "../../../../util";
import { updateLeaseEventExecutionDate } from "../../../../api";
import { DateTime } from "luxon";

function EventManager({ buildings, refreshBuildings }) {
  const handleUpdateLeaseEventExecutionDate = (eventId, executionDate) => {
    updateLeaseEventExecutionDate({
      id: eventId,
      execution_date: executionDate,
    })
      .then(() => {
        refreshBuildings();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const currentDateISO = new Date().toISOString();
    const events = getEventsInRange(buildings, currentDateISO);
    setUpcomingEvents(events);
  }, [buildings]);

  if (upcomingEvents.length === 0) {
    return <Typography variant="h6">No upcoming events.</Typography>;
  }

  return (
    <>
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
    </>
  );
}

export default EventManager;
