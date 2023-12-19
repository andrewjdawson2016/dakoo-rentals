import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

function BuildingLeasesTab() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Leases</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
    </>
  );
}

export default BuildingLeasesTab;
