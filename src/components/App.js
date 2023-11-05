import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AddLeaseForm from "./AddLeaseForm";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/add-lease" />
          </Route>
          <Route path="/add-lease">
            <AddLeaseForm />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
