import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineOppositeContent,
  TimelineConnector,
} from "@mui/lab";
import { formatDate, mapEventDescription } from "../../../../util";

const EventsTab = ({ events }) => {
  const getTimelineContent = (event) => (
    <TimelineContent
      sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
    >
      {event.execution_date && (
        <>
          <Typography>{formatDate(event.execution_date)}</Typography>
          <Typography variant="body2" style={{ fontWeight: 300 }}>
            {event.note}
          </Typography>
        </>
      )}
    </TimelineContent>
  );
  return (
    <Paper variant="outlined" square>
      <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
        <Typography component="div" role="tabpanel">
          <Timeline>
            {events.map((event, index) => (
              <TimelineItem key={event.id}>
                <TimelineOppositeContent>
                  <Box>
                    <Typography style={{ fontWeight: "bold" }}>
                      {mapEventDescription(event.description)}
                    </Typography>
                    <Typography>{formatDate(event.due_date)}</Typography>
                  </Box>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  {event.execution_date ? (
                    <TimelineDot color="success" />
                  ) : (
                    <TimelineDot />
                  )}
                  {index < events.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                {getTimelineContent(event)}
              </TimelineItem>
            ))}
          </Timeline>
        </Typography>
      </Box>
    </Paper>
  );
};

export default EventsTab;
