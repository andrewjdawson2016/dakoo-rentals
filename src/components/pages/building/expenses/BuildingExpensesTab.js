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

function BuildingExpensesTab({ building }) {
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
            {building.expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {expense.month_year}
                </TableCell>
                <TableCell align="right">{expense.fixed_amount}</TableCell>
                <TableCell align="right">{expense.variable_amount}</TableCell>
                <TableCell>{expense.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BuildingExpensesTab;
