import React, { useState } from "react";
import { Container, Typography, Button, TextField, Grid } from "@mui/material";
import { getUnloggedExpenseMonths } from "../../../../util";
import SnackbarAlert from "../../../common/SnackbarAlert";
import { DateTime } from "luxon";

function LogExpensesForm({ building }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [expensesData, setExpensesData] = useState({});

  const unloggedMonths = getUnloggedExpenseMonths(
    building.expenses,
    building.first_rental_month,
    DateTime.now()
  );

  const handleInputChange = (month, field, value) => {
    setExpensesData({
      ...expensesData,
      [month]: {
        ...expensesData[month],
        [field]: value,
      },
    });
  };

  const handleSubmit = () => {
    console.log("Expenses data to submit:", expensesData);
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" style={{ marginTop: 16, marginBottom: 20 }}>
        Log Expenses
      </Typography>

      {unloggedMonths.map((month) => (
        <Grid container spacing={2} key={month} style={{ marginBottom: 8 }}>
          <Grid item xs={4}>
            <Typography>{month}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Fixed Expenses"
              variant="outlined"
              onChange={(e) => handleInputChange(month, "name", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Variable Expenses"
              variant="outlined"
              onChange={(e) =>
                handleInputChange(month, "amount", e.target.value)
              }
            />
          </Grid>
        </Grid>
      ))}

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

export default LogExpensesForm;
