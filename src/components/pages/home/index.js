import React, { useState, useEffect } from "react";
import TopLevelToolbar from "../../common/TopLevelToolbar";
import { AppBar, Container } from "@mui/material";
import Header from "./Header";
import { listBuildings } from "../../../api";

export function HomePage() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    listBuildings()
      .then((buildings) => {
        setBuildings(buildings);
      })
      .catch((error) => {
        console.error("Failed to fetch buildings:", error);
      });
  }, []);
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <TopLevelToolbar />
      </AppBar>
      <Container component="main" maxWidth="lg" style={{ marginTop: "20px" }}>
        <Header buildings={buildings.map((building) => building.nickname)} />
      </Container>
    </>
  );
}
