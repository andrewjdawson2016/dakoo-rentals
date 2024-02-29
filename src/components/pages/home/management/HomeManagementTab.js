import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import LeaseManagement from "./LeaseManagement";
import ExpenseManagement from "./ExpenseManagement";

function HomeManagementTab({ buildings, refreshBuildings }) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Lease Management</Typography>
      </Box>
      <Divider />
      <Box mt={2} mb={2}>
        <LeaseManagement
          buildings={buildings}
          refreshBuildings={refreshBuildings}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Expense Management</Typography>
      </Box>
      <Divider />
      <Box mt={2} mb={2}>
        <ExpenseManagement
          buildings={buildings}
          refreshBuildings={refreshBuildings}
        />
      </Box>
    </>
  );
}

export default HomeManagementTab;
