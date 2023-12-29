import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Toolbar, Typography, Button } from "@mui/material";
import { logout } from "../../api";

function TopLevelToolbar() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (e) {
      console.error("Logout failed: ", e);
    }
  };

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
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Toolbar>
  );
}

export default TopLevelToolbar;
