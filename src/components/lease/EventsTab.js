import React from "react";
import { Box, Paper, Typography, Button, styled } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
  TimelineOppositeContent,
} from "@mui/lab";
import { formatDate } from "../../util";
import { updateLeaseEventExecutionDate } from "../../api";

const CustomTimelineDot = styled(TimelineDot)(({ theme, $isCompleted }) => ({
  backgroundColor: $isCompleted
    ? theme.palette.success.main
    : theme.palette.grey[400],
}));

const LeaseEventsTab = ({ events }) => {
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

  const handleCompleteEvent = (eventId) => {
    const execution_date = new Date().toISOString();

    updateLeaseEventExecutionDate({ id: eventId, execution_date })
      .then(() => {
        // Logic to update the component state
        // This could be a state update or a re-fetch of the events data
      })
      .catch((error) => {
        console.error(error);
        // Handle error (e.g., show a notification)
      });
  };

  const firstUnexecutedIndex = events.findIndex(
    (event) => !event.execution_date
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
                  <CustomTimelineDot $isCompleted={!!event.execution_date} />
                  {index < events.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ display: "flex", alignItems: "center" }}>
                  {event.execution_date ? (
                    <Typography>{formatDate(event.execution_date)}</Typography>
                  ) : (
                    index === firstUnexecutedIndex && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleCompleteEvent(event.id)}
                      >
                        Complete
                      </Button>
                    )
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Typography>
      </Box>
    </Paper>
  );
};

export default LeaseEventsTab;
