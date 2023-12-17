import React from "react";
import TopLevelToolbar from "../../common/TopLevelToolbar";

function HomePage() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <TopLevelToolbar />
      </AppBar>
    </>
  );
}

export default HomePage;
