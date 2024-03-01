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
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  DialogContentText,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import {
  getExpenseMonths,
  formatDateToMonthYear,
  parseAndFormatMonthlyMoneyValue,
} from "../../../../util";
import { DateTime } from "luxon";
import { createExpense } from "../../../../api";

function ExpenseManagement({ buildings, refreshBuildings }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [formData, setFormData] = useState({ amount: "", note: "" });
  const [displayedAmount, setDisplayedAmount] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const expensesData = buildings.flatMap((building) =>
    getExpenseMonths(
      building.expenses,
      building.first_rental_month,
      DateTime.now().toISODate()
    )
      .filter(([_, expense]) => !expense)
      .map((data) => ({ ...data, building }))
  );

  const handleAddExpense = (building, month) => {
    setSelectedBuilding(building);
    setSelectedMonthYear(month);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBuilding(null);
    setSelectedMonthYear(null);
    setFormData({ amount: "", note: "" });
    setDisplayedAmount("");
  };

  const handleAmountChange = (event) => {
    const { numericValue, formattedValue } = parseAndFormatMonthlyMoneyValue(
      event.target.value
    );
    setFormData((prev) => ({ ...prev, amount: numericValue }));
    setDisplayedAmount(formattedValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const dataToSend = {
      building_id: selectedBuilding.id,
      month_year: selectedMonthYear,
      ...formData,
    };

    createExpense(dataToSend)
      .then(() => {
        setSnackbarMessage("Expense logged");
        setSnackbarOpen(true);
        handleCloseDialog();
        refreshBuildings();
      })
      .catch((error) => {
        console.error("Error creating expense:", error);
        setSnackbarMessage(`Error creating expense: ${error.message}`);
        setSnackbarOpen(true);
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="expenses table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Building</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Add Expense</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData.map((data, index) => {
              const { building } = data;
              const month = data[0];
              return (
                <TableRow key={index}>
                  <TableCell>{building.nickname}</TableCell>
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
        <DialogTitle>{selectedBuilding?.nickname}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Expense for {formatDateToMonthYear(selectedMonthYear)}{" "}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            name="amount"
            value={displayedAmount}
            onChange={handleAmountChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="note"
            label="Optional Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
}

export default ExpenseManagement;
