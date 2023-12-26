import React from "react";
import { Box, Container, Tabs, Tab } from "@mui/material";
import OverviewTab from "./OverviewTab";
import EventsTab from "./EventsTab";
import NotesTab from "./NotesTab";
import DocumentsTab from "./DocumentsTab";

function LeaseDetailsBox({ lease, refreshBuilding }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Overview" />
          <Tab label="Events" />
          <Tab label="Notes" />
          <Tab label="Documents" />
        </Tabs>
      </Box>
      {value === 0 && <OverviewTab lease={lease} />}
      {value === 1 && (
        <EventsTab
          events={lease.leaseEvents}
          refreshBuilding={refreshBuilding}
        />
      )}
      {value === 2 && <NotesTab />}
      {value === 3 && <DocumentsTab />}
    </Container>
  );
}

export default LeaseDetailsBox;
