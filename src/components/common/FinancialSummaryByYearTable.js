import React from "react";
import { computeFinancialSummaryByYear } from "../../util";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function FinancialSummaryByYearTable({ buildings }) {
  const financialSummary = computeFinancialSummaryByYear(buildings);

  const formatCurrency = (value) => {
    const absValue = Math.abs(Math.round(value));
    const formattedValue = absValue.toLocaleString();
    return value < 0 ? `($${formattedValue})` : `$${formattedValue}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="financial summary table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Year</TableCell>
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
          {financialSummary.map(({ year, income, expense, profit }) => (
            <TableRow key={year}>
              <TableCell component="th" scope="row">
                {year}
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

export default FinancialSummaryByYearTable;
