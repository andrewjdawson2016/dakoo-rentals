import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Box,
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

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Portfolio Overview</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Add Building
          </Button>
          <Box
            style={{
              marginLeft: "10px",
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
          </Menu>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
    </>
  );
}

export default Header;
