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
} from "@mui/material";
import { getEventsInRange, formatDate } from "../../../../util";

function EventManager({ buildings, refreshBuildings }) {
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
              <TableCell>Property</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingEvents.map((event, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {event.fqPropertyName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDate(event.event.due_date)}
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
