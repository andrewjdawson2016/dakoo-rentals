import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header({ buildings }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAddNewProperty = () => {
    console.log("Add new property logic goes here");
    handleCloseMenu();
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Portfolio Overview</Typography>
        </Grid>
        <Grid item>
          <Box
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
            onClick={handleOpenMenu}
          >
            <Typography variant="body1">Buildings</Typography>
            <ArrowDropDownIcon />
          </Box>
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            {buildings.map((building, index) => (
              <MenuItem key={index} onClick={handleCloseMenu}>
                {building}
              </MenuItem>
            ))}
            <Divider />
            <MenuItem>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddNewProperty}
              >
                Add New Building
              </Button>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
    </>
  );
}

export default Header;
