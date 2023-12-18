import React, { useState, useEffect } from "react";
import TopLevelToolbar from "../../common/TopLevelToolbar";
import { AppBar, Container } from "@mui/material";
import Header from "./Header";
import BuildingToolbar from "./BuildingToolbar";
import { getBuilding } from "../../../api";

export function BuildingPage() {
  const [building, setBuilding] = useState(null);
  const { building_id } = useParams();

  const refreshBuilding = () => {
    getBuilding(building_id)
      .then((building) => {
        setBuilding(building);
      })
      .catch((error) => {
        console.error("Failed to fetch building:", error);
      });
  };

  useEffect(() => {
    refreshBuilding();
  }, []);
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <TopLevelToolbar />
        <BuildingToolbar building={building} />
      </AppBar>
      <Container component="main" maxWidth="lg" style={{ marginTop: "20px" }}>
        <Header />
      </Container>
    </>
  );
}
