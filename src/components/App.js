import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddLeaseForm from "./AddLeaseForm";
import PropertiesTable from "./PropertiesTable";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PropertiesTable />} />
          <Route path="/add-lease" element={<AddLeaseForm />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
