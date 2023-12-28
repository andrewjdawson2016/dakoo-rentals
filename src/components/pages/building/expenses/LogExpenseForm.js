import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import SnackbarAlert from "../../../common/SnackbarAlert";
import { createExpense } from "../../../../api";
import {
  formatDateToMonthYear,
  parseAndFormatMonthlyMoneyValue,
} from "../../../../util";

function LogExpenseForm({ building, monthYear, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    amount: "",
    note: "",
  });
  const [displayedAmount, setDisplayedAmount] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAmountChange = (event) => {
    const { numericValue, formattedValue } = parseAndFormatMonthlyMoneyValue(
      event.target.value
    );
    setFormData((prev) => ({
      ...prev,
      amount: numericValue,
    }));
    setDisplayedAmount(formattedValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    let dataToSend = {
      building_id: building.id,
      month_year: monthYear,
      ...formData,
    };

    createExpense(dataToSend)
      .then(() => {
        console.log("Expense created successfully:");
        setFormData({
          amount: "",
          note: "",
        });
        setDisplayedAmount("");
        onSubmitSuccess();
      })
      .catch((e) => {
        console.error("Error creating expense:", e);
        setSnackbarMessage(`Error creating expense: ${e.message}`);
        setSnackbarOpen(true);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" style={{ marginTop: 16, marginBottom: 20 }}>
        Expense - {formatDateToMonthYear(monthYear)}
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Amount"
        name="amount"
        value={displayedAmount}
        onChange={handleAmountChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Optional Note"
        name="note"
        value={formData.note}
        onChange={handleChange}
        multiline
        rows={4}
      />
      <Button
        type="submit"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: 16, marginBottom: 20 }}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </Container>
  );
}

export default LogExpenseForm;
