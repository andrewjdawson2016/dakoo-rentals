import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import TableViewIcon from "@mui/icons-material/TableView";
import BarChartIcon from "@mui/icons-material/BarChart";

import FinancialSummaryByYearChart from "../../../common/FinancialSummaryByYearChart";
import FinancialSummaryByMonthChart from "../../../common/FinancialSummaryByMonthChart";
import YearlyPercentChangeChart from "../../../common/YearlyPercentChangeChart";
import FinancialSummaryByYearTable from "../../../common/FinancialSummaryByYearTable";
import YearlyPercentChangeTable from "../../../common/YearlyPercentChangeTable";
import FinancialSummaryByMonthTable from "../../../common/FinancialSummaryByMonthTable";

function BuildingMetricsTab({ building }) {
  const [showYearlyChart, setShowYearlyChart] = useState(true);
  const [showMonthlyChart, setShowMonthlyChart] = useState(true);
  const [showPercentChangeChart, setShowPercentChangeChart] = useState(true);

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Metrics
      </Typography>
      <Divider style={{ margin: "20px 0" }} />

      <Grid container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={showYearlyChart}
                onChange={() => setShowYearlyChart(!showYearlyChart)}
              />
            }
            label={showYearlyChart ? <BarChartIcon /> : <TableViewIcon />}
          />
          {showYearlyChart ? (
            <FinancialSummaryByYearChart buildings={[building]} />
          ) : (
            <FinancialSummaryByYearTable buildings={[building]} />
          )}
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={showMonthlyChart}
                onChange={() => setShowMonthlyChart(!showMonthlyChart)}
              />
            }
            label={showMonthlyChart ? <BarChartIcon /> : <TableViewIcon />}
          />
          {showMonthlyChart ? (
            <FinancialSummaryByMonthChart buildings={[building]} />
          ) : (
            <FinancialSummaryByMonthTable buildings={[building]} />
          )}
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={showPercentChangeChart}
                onChange={() =>
                  setShowPercentChangeChart(!showPercentChangeChart)
                }
              />
            }
            label={
              showPercentChangeChart ? <BarChartIcon /> : <TableViewIcon />
            }
          />
          {showPercentChangeChart ? (
            <YearlyPercentChangeChart buildings={[building]} />
          ) : (
            <YearlyPercentChangeTable buildings={[building]} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default BuildingMetricsTab;
