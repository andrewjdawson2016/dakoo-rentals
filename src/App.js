import React from "react";
import AddPropertyForm from "./AddPropertyForm";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AddPropertyForm />
    </ThemeProvider>
  );
}

export default App;
