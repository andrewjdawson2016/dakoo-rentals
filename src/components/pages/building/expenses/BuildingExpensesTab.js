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
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  getExpenseMonths,
  formatDateToMonthYear,
  formatMonthlyMoneyValue,
} from "../../../../util";
import { deleteExpense } from "../../../../api";
import { DateTime } from "luxon";

function BuildingExpensesTab({ building, refreshBuilding }) {
  const expensesData = getExpenseMonths(
    building.expenses,
    building.first_rental_month,
    DateTime.now().toISODate()
  ).reverse();

  const handleDeleteExpense = async (expense) => {
    try {
      await deleteExpense(expense.id);
      refreshBuilding();
    } catch (error) {
      console.error("Error deleting expense:", error.message);
    }
  };

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
              <TableCell style={{ fontWeight: "bold" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData.map(([month, expense], index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {formatDateToMonthYear(month)}
                </TableCell>
                <TableCell>
                  {expense ? formatMonthlyMoneyValue(expense.amount) : ""}
                </TableCell>
                <TableCell>{expense ? expense.note : ""}</TableCell>
                <TableCell>
                  {expense && (
                    <IconButton onClick={() => handleDeleteExpense(expense)}>
                      <Delete />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BuildingExpensesTab;
