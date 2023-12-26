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
import { getExpenseMonths } from "../../../../util";
import { DateTime } from "luxon";

function BuildingExpensesTab({ building }) {
  const expensesData = getExpenseMonths(
    building.expenses,
    building.first_rental_month,
    DateTime.now().toISODate()
  );

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
              <TableCell>Date</TableCell>
              <TableCell align="right">Fixed Amount</TableCell>
              <TableCell align="right">Variable Amount</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData.map(([month, expense], index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {month}
                </TableCell>
                <TableCell align="right">
                  {expense ? expense.fixed_amount : "-"}
                </TableCell>
                <TableCell align="right">
                  {expense ? expense.variable_amount : "-"}
                </TableCell>
                <TableCell>{expense ? expense.note : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BuildingExpensesTab;
