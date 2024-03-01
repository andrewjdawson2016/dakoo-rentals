import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  getExpenseMonths,
  formatDateToMonthYear,
  formatMonthlyMoneyValue,
} from "../../../../util";
import { DateTime } from "luxon";

function BuildingExpensesTab({ building }) {
  const expensesData = getExpenseMonths(
    building.expenses,
    building.first_rental_month,
    DateTime.now().toISODate()
  ).reverse();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Expenses</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />

      <TableContainer component={Paper}>
        <Table aria-label="expenses table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData.map(([month, expense], index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {formatDateToMonthYear(month)}
                </TableCell>
                <TableCell>
                  {expense
                    ? formatMonthlyMoneyValue(expense.amount)
                    : "no expense logged"}
                </TableCell>
                <TableCell>{expense ? expense.note : ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BuildingExpensesTab;
