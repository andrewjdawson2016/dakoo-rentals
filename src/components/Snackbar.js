import React from "react";
import { Snackbar, Alert } from "@mui/material";

function SnackbarComponent({ open, message, handleClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarComponent;
