import React from "react";
import { Box, Paper, Typography, Container, Tabs, Tab } from "@mui/material";
import LeaseOverviewTab from "./OverviewTab";

function LeaseTabsBox({ lease }) {
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
        <Paper variant="outlined" square>
          <Typography component="div" role="tabpanel">
            <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
              Events Content
            </Box>
          </Typography>
        </Paper>
      )}
      {value === 2 && (
        <Paper variant="outlined" square>
          <Typography component="div" role="tabpanel">
            <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
              Notes Content
            </Box>
          </Typography>
        </Paper>
      )}
      {value === 3 && (
        <Paper variant="outlined" square>
          <Typography component="div" role="tabpanel">
            <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
              Documents Content
            </Box>
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default LeaseTabsBox;
