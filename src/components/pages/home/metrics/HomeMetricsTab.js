import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import FinancialSummaryByYear from "../../../common/FinancialSummaryByYear";
import FinancialSummaryByMonth from "../../../common/FinancialSummaryByMonth";
import YearlyPercentChange from "../../../common/YearlyPercentChange";

function HomeMetricsTab({ buildings }) {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Metrics</Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      <FinancialSummaryByYear buildings={buildings} />
      <FinancialSummaryByMonth buildings={buildings} />
      <YearlyPercentChange buildings={buildings} />
    </>
  );
}

export default HomeMetricsTab;
