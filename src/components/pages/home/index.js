import React from "react";
import TopLevelToolbar from "../../common/TopLevelToolbar";
import { AppBar, Container } from "@mui/material";
import Header from "./Header";

export function HomePage() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <TopLevelToolbar />
      </AppBar>
      <Container component="main" maxWidth="lx" style={{ marginTop: "20px" }}>
        <Header buildings={["Building 1", "Building 2", "Building 3"]} />
      </Container>
    </>
  );
}
