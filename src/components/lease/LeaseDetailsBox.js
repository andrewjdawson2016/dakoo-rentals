import React from "react";
import { Box, Container, Tabs, Tab } from "@mui/material";
import LeaseOverviewTab from "./OverviewTab";
import LeaseEventsTab from "./EventsTab";
import LeaseNotesTab from "./NotesTab";
import LeaseDocumentsTab from "./DocumentsTab";

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
      {value === 0 && <LeaseOverviewTab lease={lease} />}
      {value === 1 && (
        <LeaseEventsTab
          events={lease.leaseEvents}
          refreshLeases={refreshLeases}
        />
      )}
      {value === 2 && <LeaseNotesTab notes={lease.leaseNotes} />}
      {value === 3 && <LeaseDocumentsTab lease={lease} />}
    </Container>
  );
}

export default LeaseDetailsBox;
