import React from "react";
import { Toolbar, Typography, Tabs, Tab } from "@mui/material";

function BuildingToolbar({ building, selectedTab, setSelectedTab }) {
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "black" }}
        >
          {building.nickname}
        </Typography>
      </Toolbar>
      <Toolbar>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Overview" />
          <Tab label="Leases" />
        </Tabs>
      </Toolbar>
    </>
  );
}

export default BuildingToolbar;
