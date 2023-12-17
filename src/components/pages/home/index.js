import React from "react";
import TopLevelToolbar from "../../common/TopLevelToolbar";
import { AppBar } from "@mui/material";

export function HomePage() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <TopLevelToolbar />
      </AppBar>
    </>
  );
}
