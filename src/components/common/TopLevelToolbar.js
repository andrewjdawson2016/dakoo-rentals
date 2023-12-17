import React from "react";
import { Link } from "react-router-dom";
import { Toolbar, Typography } from "@mui/material";

function TopLevelToolbar() {
  return (
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, color: "black" }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <img src="/logo.png" alt="DaKoo Rentals" style={{ height: "50px" }} />
        </Link>
      </Typography>
    </Toolbar>
  );
}

export default TopLevelToolbar;
