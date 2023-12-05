import React from "react";
import { useParams, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";

function PropertyDetailsPage() {
  const [value, setValue] = React.useState(0);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const { address } = useParams();

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <img
                src="/logo.png"
                alt="DaKoo Rentals"
                style={{ height: "50px" }}
              />
            </Link>
          </Typography>
        </Toolbar>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            {address}
          </Typography>
        </Toolbar>
        <Toolbar>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Overview" />
            <Tab label="Leases" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default PropertyDetailsPage;
