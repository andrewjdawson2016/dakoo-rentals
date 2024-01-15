import React from "react";
import { getPercentageFinancialSummaryYearlyPercentChange } from "../../util";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function YearlyPercentChangeTable({ buildings }) {
  const percentageSummary =
    getPercentageFinancialSummaryYearlyPercentChange(buildings);

  const formatPercentage = (value) => {
    if (
      isNaN(value) ||
      value === null ||
      value === undefined ||
      !isFinite(value)
    ) {
      return "N/A";
    }
    const absValue = Math.abs(value.toFixed(2));
    return value < 0 ? `(${absValue}%)` : `${absValue}%`;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="yearly percent change table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Year</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Income Change
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Expense Change
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Profit Change
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {percentageSummary.map(
            ({
              year,
              incomeChangePercent,
              expenseChangePercent,
              profitChangePercent,
            }) => (
              <TableRow key={year}>
                <TableCell component="th" scope="row">
                  {year}
                </TableCell>
                <TableCell align="center">
                  {formatPercentage(incomeChangePercent)}
                </TableCell>
                <TableCell align="center">
                  {formatPercentage(expenseChangePercent)}
                </TableCell>
                <TableCell align="center">
                  {formatPercentage(profitChangePercent)}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default YearlyPercentChangeTable;
