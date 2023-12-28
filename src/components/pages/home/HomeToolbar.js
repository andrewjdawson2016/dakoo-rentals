import React from "react";
import { Toolbar, Tabs, Tab } from "@mui/material";

function HomeToolbar({ selectedTab, setSelectedTab }) {
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Toolbar>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Buildings" />
          <Tab label="Metrics" />
          <Tab label="Management" />
        </Tabs>
      </Toolbar>
    </>
  );
}

export default HomeToolbar;
