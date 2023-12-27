import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

function BuildingOverviewTab() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Building Overview</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
    </>
  );
}

export default BuildingOverviewTab;
