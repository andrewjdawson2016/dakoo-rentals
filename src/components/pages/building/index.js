import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import TopLevelToolbar from "../../common/TopLevelToolbar";
import { AppBar, Container, CircularProgress, Box } from "@mui/material";
import BuildingToolbar from "./BuildingToolbar";
import BuildingOverviewTab from "./overview/BuildingOverviewTab";
import BuildingLeasesTab from "./leases/BuildingLeasesTab";
import BuildingExpensesTab from "./expenses/BuildingExpensesTab";
import { getBuilding } from "../../../api";

export function BuildingPage() {
  const [building, setBuilding] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const { building_id } = useParams();

  const refreshBuilding = useCallback(() => {
    if (building_id) {
      getBuilding(building_id)
        .then((building) => {
          setBuilding(building);
        })
        .catch((error) => {
          console.error("Failed to fetch building:", error);
        });
    }
  }, [building_id]);

  useEffect(() => {
    refreshBuilding();
  }, [refreshBuilding]);

  if (!building) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <TopLevelToolbar />
        <BuildingToolbar
          building={building}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </AppBar>
      <Container component="main" maxWidth="lg" style={{ marginTop: "20px" }}>
        {selectedTab === 0 && <BuildingOverviewTab building={building} />}
        {selectedTab === 1 && (
          <BuildingLeasesTab
            building={building}
            refreshBuilding={refreshBuilding}
          />
        )}
        {selectedTab === 2 && (
          <BuildingExpensesTab
            building={building}
            refreshBuilding={refreshBuilding}
          />
        )}
      </Container>
    </>
  );
}
