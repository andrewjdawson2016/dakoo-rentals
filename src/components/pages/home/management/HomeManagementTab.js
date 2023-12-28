import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

function HomeManagementTab({ buildings, refreshBuildings }) {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Management</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      <Typography variant="h6">Coming Soon....</Typography>
    </>
  );
}

export default HomeManagementTab;
