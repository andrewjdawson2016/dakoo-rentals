import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import FinancialSummaryByYearChart from "../../../common/FinancialSummaryByYearChart";
import FinancialSummaryByMonthChart from "../../../common/FinancialSummaryByMonthChart";
import YearlyPercentChangeChart from "../../../common/YearlyPercentChangeChart";

function HomeMetricsTab({ buildings }) {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Metrics</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      <FinancialSummaryByYearChart buildings={buildings} />
      <FinancialSummaryByMonthChart buildings={buildings} />
      <YearlyPercentChangeChart buildings={buildings} />
    </>
  );
}

export default HomeMetricsTab;
