import React, { useState } from "react";
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
  Dialog,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import {
  getExpenseMonths,
  formatDateToMonthYear,
  formatMonthlyMoneyValue,
} from "../../../../util";
import { deleteExpense } from "../../../../api";
import { DateTime } from "luxon";
import LogExpenseForm from "./LogExpenseForm";

function BuildingExpensesTab({ building, refreshBuilding }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);
  const expensesData = getExpenseMonths(
    building.expenses,
    building.first_rental_month,
    DateTime.now().toISODate()
  ).reverse();

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const onSubmitSuccess = () => {
    handleCloseDialog();
    refreshBuilding();
  };

  const handleAddExpense = (month) => {
    setSelectedMonthYear(month);
    setDialogOpen(true);
  };

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
              <TableCell>Date</TableCell>
              <TableCell>Fixed Amount</TableCell>
              <TableCell>Variable Amount</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Add/Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData.map(([month, expense], index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {formatDateToMonthYear(month)}
                </TableCell>
                <TableCell>
                  {expense ? formatMonthlyMoneyValue(expense.fixed_amount) : ""}
                </TableCell>
                <TableCell>
                  {expense
                    ? formatMonthlyMoneyValue(expense.variable_amount)
                    : ""}
                </TableCell>
                <TableCell>{expense ? expense.note : ""}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      expense
                        ? handleDeleteExpense(expense)
                        : handleAddExpense(month)
                    }
                  >
                    {expense ? <Delete /> : <Add />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <LogExpenseForm
          building={building}
          monthYear={selectedMonthYear}
          onSubmitSuccess={onSubmitSuccess}
        />
      </Dialog>
    </>
  );
}

export default BuildingExpensesTab;
