import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, BuildingPage, SignupForm, LoginForm } from "./pages";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:building_id" element={<BuildingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
