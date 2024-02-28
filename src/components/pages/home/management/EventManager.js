import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getEventsInRange } from "../../../../util";

function EventManager({ buildings, refreshBuildings }) {
  const mapEventDescription = (description) => {
    switch (description) {
      case "START":
        return "Lease Starts";
      case "SIX_MONTH":
        return "Send Renewal Option (6 Mo.)";
      case "TWO_MONTH":
        return "Renewal Deadline Reminder (2 Mo.)";
      case "ONE_MONTH":
        return "Renewal Deadline (1 Mo.)";
      case "END":
        return "Lease Ends";
      default:
        return description;
    }
  };

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const currentDateISO = new Date().toISOString();
    const events = getEventsInRange(buildings, currentDateISO);
    setUpcomingEvents(events);
  }, [buildings]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="upcoming events table">
          <TableHead>
            <TableRow>
              <TableCell>Due Date</TableCell>
              <TableCell>Execution Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingEvents.map((event, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {event.due_date}
                </TableCell>
                <TableCell component="th" scope="row">
                  {event.execution_date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {upcomingEvents.length === 0 && (
        <Typography variant="h6">No upcoming events.</Typography>
      )}
    </>
  );
}

export default EventManager;
