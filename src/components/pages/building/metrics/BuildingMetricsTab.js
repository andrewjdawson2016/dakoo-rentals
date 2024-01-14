import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import FinancialSummaryByYearChart from "../../../common/FinancialSummaryByYearChart";
import FinancialSummaryByMonthChart from "../../../common/FinancialSummaryByMonthChart";
import YearlyPercentChangeChart from "../../../common/YearlyPercentChangeChart";
import FinancialSummaryByYearTable from "../../../common/FinancialSummaryByYearTable";
import YearlyPercentChangeTable from "../../../common/YearlyPercentChangeTable";

function BuildingMetricsTab({ building }) {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Metrics</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      <FinancialSummaryByYearChart buildings={[building]} />
      <FinancialSummaryByMonthChart buildings={[building]} />
      <YearlyPercentChangeChart buildings={[building]} />
      <FinancialSummaryByYearTable buildings={[building]} />
      <YearlyPercentChangeTable buildings={[building]} />
    </>
  );
}

export default BuildingMetricsTab;
