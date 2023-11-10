import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LeaseAddForm from "./lease/AddForm";
import PropertiesTable from "./property/Table";
import PropertyDetails from "./property/Details";
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
          <Route path="/add-lease" element={<LeaseAddForm />} />
          <Route path="/:address" element={<PropertyDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
