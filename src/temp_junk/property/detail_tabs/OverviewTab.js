import React from "react";
import { Container, Typography, Grid, Divider } from "@mui/material";

function OverviewTab() {
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: "20px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Overview</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
    </Container>
  );
}

export default OverviewTab;
