import React, { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { createExpense } from "../../../../api";
import SnackbarAlert from "../../../common/SnackbarAlert";

function LogExpensesForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = () => {
    console.log("called handle submit");
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" style={{ marginTop: 16, marginBottom: 20 }}>
        Log Expenses
      </Typography>

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
