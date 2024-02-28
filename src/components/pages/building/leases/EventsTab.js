import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
  TimelineOppositeContent,
} from "@mui/lab";
import { formatDate, mapEventDescription } from "../../../../util";
import { updateLeaseEventExecutionDate } from "../../../../api";
import { DateTime } from "luxon";

const EventsTab = ({ events, refreshBuilding }) => {
  const handleUpdateLeaseEventExecutionDate = (eventId, executionDate) => {
    updateLeaseEventExecutionDate({
      id: eventId,
      execution_date: executionDate,
    })
      .then(() => {
        refreshBuilding();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const firstUnexecutedIndex = events.findIndex(
    (event) => !event.execution_date
  );

  const getTimelineContent = ({ events, index }) => {
    const event = events[index];
    if (index === firstUnexecutedIndex) {
      return (
        <TimelineContent sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              handleUpdateLeaseEventExecutionDate(
                event.id,
                DateTime.now().toISODate()
              )
            }
          >
            Complete
          </Button>
        </TimelineContent>
      );
    }

    const displayDate =
      firstUnexecutedIndex === -1 || index < firstUnexecutedIndex;
    const displayUndoButton =
      (firstUnexecutedIndex === -1 && index === events.length - 1) ||
      (firstUnexecutedIndex !== -1 && index === firstUnexecutedIndex - 1);

    return (
      <TimelineContent sx={{ display: "flex", alignItems: "center" }}>
        {displayDate && (
          <Typography>{formatDate(event.execution_date)}</Typography>
        )}
        {displayUndoButton && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleUpdateLeaseEventExecutionDate(event.id, "")}
            sx={{ ml: 2 }}
          >
            Undo
          </Button>
        )}
      </TimelineContent>
    );
  };

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
                {getTimelineContent({ events, index })}
              </TimelineItem>
            ))}
          </Timeline>
        </Typography>
      </Box>
    </Paper>
  );
};

export default EventsTab;
