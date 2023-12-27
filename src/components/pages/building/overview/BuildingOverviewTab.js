import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import FinancialSummaryByYearChart from "../../../common/FinancialSummaryByYearChart";
import FinancialSummaryByMonthChart from "../../../common/FinancialSummaryByMonthChart";

function BuildingOverviewTab({ building }) {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Building Overview</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      <FinancialSummaryByYearChart buildings={[building]} />
      <FinancialSummaryByMonthChart buildings={[building]} />
    </>
  );
}

export default BuildingOverviewTab;
