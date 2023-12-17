import React from "react";
import { Box, Container, Tabs, Tab } from "@mui/material";
import OverviewTab from "./detail_tabs/OverviewTab";
import EventsTab from "./detail_tabs/EventsTab";
import NotesTab from "./detail_tabs/NotesTab";
import DocumentsTab from "./detail_tabs/DocumentsTab";

function LeaseDetailsBox({ lease, refreshLeases }) {
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
        <EventsTab events={lease.leaseEvents} refreshLeases={refreshLeases} />
      )}
      {value === 2 && <NotesTab notes={lease.leaseNotes} />}
      {value === 3 && <DocumentsTab lease={lease} />}
    </Container>
  );
}

export default LeaseDetailsBox;
