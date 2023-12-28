import React, { useState, useEffect } from "react";
import TopLevelToolbar from "../../common/TopLevelToolbar";
import { AppBar, Container, CircularProgress, Box } from "@mui/material";
import HomeToolbar from "./HomeToolbar";
import HomeMetricsTab from "./metrics/HomeMetricsTab";
import HomeManagementTab from "./management/HomeManagementTab";
import { listBuildings } from "../../../api";
import HomeBuildingsTab from "./buildings/HomeBuildingsTab";

export function HomePage() {
  const [buildings, setBuildings] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const refreshBuildings = () => {
    listBuildings()
      .then((buildings) => {
        setBuildings(buildings);
      })
      .catch((error) => {
        console.error("Failed to fetch buildings:", error);
      });
  };

  useEffect(() => {
    refreshBuildings();
  }, []);

  if (!buildings) {
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
        <HomeToolbar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </AppBar>
      <Container component="main" maxWidth="lg" style={{ marginTop: "20px" }}>
        {selectedTab === 0 && (
          <HomeBuildingsTab
            buildings={buildings}
            onRefresh={refreshBuildings}
          />
        )}
        {selectedTab === 1 && <HomeMetricsTab buildings={buildings} />}
        {selectedTab === 2 && (
          <HomeManagementTab
            buildings={buildings}
            refreshBuildings={refreshBuildings}
          />
        )}
      </Container>
    </>
  );
}
