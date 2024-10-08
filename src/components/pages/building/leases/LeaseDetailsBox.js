import React from "react";
import { Box, Container, Tabs, Tab } from "@mui/material";
import OverviewTab from "./OverviewTab";
import EventsTab from "./EventsTab";

function LeaseDetailsBox({ lease, refreshBuilding }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteSuccess = () => {
    refreshBuilding();
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
        </Tabs>
      </Box>
      {value === 0 && (
        <OverviewTab lease={lease} onDeleteSuccess={handleDeleteSuccess} />
      )}
      {value === 1 && <EventsTab events={lease.leaseEvents} />}
    </Container>
  );
}

export default LeaseDetailsBox;
