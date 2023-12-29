import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toolbar, Typography, Button } from "@mui/material";
import { logout } from "../../api";

function TopLevelToolbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
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
