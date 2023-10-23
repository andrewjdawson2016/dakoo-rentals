import React from "react";
import AddLeaseForm from "./AddLeaseForm";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AddLeaseForm />
    </ThemeProvider>
  );
}

export default App;
