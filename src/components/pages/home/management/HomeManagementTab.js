import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import EventManager from "./EventManager";

function HomeManagementTab({ buildings, refreshBuildings }) {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Management</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      <EventManager buildings={buildings} refreshBuildings={refreshBuildings} />
    </>
  );
}

export default HomeManagementTab;
