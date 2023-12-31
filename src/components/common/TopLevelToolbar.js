import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { logout } from "../../api";

function TopLevelToolbar({ user }) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.error("Logout failed: ", e);
    }
  };

  const sideDrawer = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 250 }}
    >
      <List>
        <ListItem sx={{ cursor: "default", userSelect: "none" }}>
          <ListItemText primary={`${user.firstName} ${user.lastName}`} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          onClick={handleLogout}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ style: { color: "red" } }}
          />
        </ListItem>
      </List>
    </Box>
  );

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
      <IconButton color="primary" onClick={toggleDrawer(true)}>
        <PersonIcon />
      </IconButton>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {sideDrawer}
      </Drawer>
    </Toolbar>
  );
}

export default TopLevelToolbar;
