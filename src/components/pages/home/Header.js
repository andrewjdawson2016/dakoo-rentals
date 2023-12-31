import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Box,
  Button,
  Dialog,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddForm from "./AddForm";

function Header({ buildings, onRefresh }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAddNewProperty = () => {
    setDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSelectBuilding = (buildingId) => {
    navigate(`/${buildingId}`);
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
              <MenuItem
                key={index}
                onClick={() => handleSelectBuilding(building.id)}
              >
                {building.nickname}
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
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <AddForm
          onSuccessfulSubmit={() => {
            handleCloseDialog();
            onRefresh();
          }}
        />
      </Dialog>
    </>
  );
}

export default Header;
