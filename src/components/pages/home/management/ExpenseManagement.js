import React, { useState } from "react";
import {
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
import { Add } from "@mui/icons-material";
import { getExpenseMonths, formatDateToMonthYear } from "../../../../util";
import { DateTime } from "luxon";
import LogExpenseForm from "./LogExpenseForm";

function ExpenseManagement({ buildings, refreshBuildings }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const onSubmitSuccess = () => {
    handleCloseDialog();
    refreshBuildings();
  };

  const handleAddExpense = (building, month) => {
    setSelectedBuilding(building);
    setSelectedMonthYear(month);
    setDialogOpen(true);
  };

  const expensesData = buildings.flatMap((building) =>
    getExpenseMonths(
      building.expenses,
      building.first_rental_month,
      DateTime.now().toISODate()
    )
      .filter(([_, expense]) => !expense)
      .map((data) => ({ ...data, building }))
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="expenses table">
          <TableHead>
            <TableRow>
              <TableCell>Building</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Add Expense</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData.map((data, index) => {
              const { building } = data;
              const month = data[0];
              return (
                <TableRow key={index}>
                  <TableCell>{building.nickname}</TableCell>{" "}
                  <TableCell>{formatDateToMonthYear(month)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleAddExpense(building, month)}
                    >
                      <Add />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <LogExpenseForm
          building={selectedBuilding}
          monthYear={selectedMonthYear}
          onSubmitSuccess={onSubmitSuccess}
        />
      </Dialog>
    </>
  );
}

export default ExpenseManagement;
