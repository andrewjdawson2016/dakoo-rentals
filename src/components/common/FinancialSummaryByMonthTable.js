import React from "react";
import { DateTime } from "luxon";
import { computeFinancialSummaryByMonth } from "../../util";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function FinancialSummaryByMonthTable({ buildings }) {
  const financialSummary = computeFinancialSummaryByMonth(buildings);

  const formatCurrency = (value) => {
    const absValue = Math.abs(Math.round(value));
    const formattedValue = absValue.toLocaleString();
    return value < 0 ? `($${formattedValue})` : `$${formattedValue}`;
  };

  const formatDate = (dateString) => {
    return DateTime.fromISO(dateString).toFormat("MMM yyyy");
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="monthly financial summary table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Income
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Expenses
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Profit/Loss
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {financialSummary.map(({ monthYear, income, expense, profit }) => (
            <TableRow key={monthYear}>
              <TableCell component="th" scope="row">
                {formatDate(monthYear)}
              </TableCell>
              <TableCell align="center">{formatCurrency(income)}</TableCell>
              <TableCell align="center">{formatCurrency(expense)}</TableCell>
              <TableCell align="center">{formatCurrency(profit)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FinancialSummaryByMonthTable;
