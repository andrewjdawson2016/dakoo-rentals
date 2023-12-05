import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PropertiesTablePage from "./property/PropertiesTablePage";
import PropertyDetailsPage from "./property/PropertyDetailsPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PropertiesTablePage />} />
          <Route path="/:address" element={<PropertyDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
