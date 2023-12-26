import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import SnackbarAlert from "../../../common/SnackbarAlert";
import { createExpense } from "../../../../api";
import { formatDateToMonthYear } from "../../../../util";

function LogExpenseForm({ building, monthYear, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fixed_amount: "",
    variable_amount: "",
    note: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    let updates = (updates[name] = value);
    setFormData((prev) => ({ ...prev, ...updates }));
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
          fixed_amount: "",
          variable_amount: "",
          note: "",
        });
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
        label="Fixed Amount"
        name="fixed_amount"
        value={formData.fixed_amount}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Flexiable Amount"
        name="flexiable_amount"
        value={formData.flexiable_amount}
        onChange={handleChange}
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
