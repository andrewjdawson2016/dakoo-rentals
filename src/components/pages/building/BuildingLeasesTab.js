import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Button,
  Dialog,
} from "@mui/material";
import AddLeaseForm from "./AddLeaseForm";

function BuildingLeasesTab({ building }) {
  const [selectedUnit, setSelectedUnit] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (building.building_type === "MULTI_FAMILY") {
      setSelectedUnit(building.units[0]?.unit_number);
    }
  }, [building]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleAddNewLease = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Leases</Typography>
        </Grid>
        <Grid item>
          {building.building_type === "MULTI_FAMILY" && (
            <>
              <FormControl variant="standard" sx={{ minWidth: 120, mr: 2 }}>
                <Select
                  value={selectedUnit}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {building.units.map((unit) => (
                    <MenuItem key={unit.unit_number} value={unit.unit_number}>
                      {"Unit: " + unit.unit_number}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewLease}
          >
            Add New Lease
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <AddLeaseForm
          building={building}
          unit={selectedUnit}
          onSuccessfulSubmit={() => {
            handleCloseDialog();
          }}
        />
      </Dialog>
    </>
  );
}

export default BuildingLeasesTab;
