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
import { Add, Edit } from "@mui/icons-material";
import { getExpenseMonths, formatDateToMonthYear } from "../../../../util";
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

  const handleEditExpense = (expense) => {
    console.log("Edit expense", expense);
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
                <TableCell>{expense ? expense.fixed_amount : "-"}</TableCell>
                <TableCell>{expense ? expense.variable_amount : "-"}</TableCell>
                <TableCell>{expense ? expense.note : "-"}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      expense
                        ? handleEditExpense(expense)
                        : handleAddExpense(month)
                    }
                  >
                    {expense ? <Edit /> : <Add />}
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
