import React, { useState } from "react";
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
  const [selectedUnit, setSelectedUnit] = useState(building.units[0]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    const unitNumber = event.target.value;
    const unitObject = building.units.find(
      (unit) => unit.unit_number === unitNumber
    );
    setSelectedUnit(unitObject);
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
                  value={selectedUnit.unit_number}
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
          onSubmitSuccess={handleCloseDialog}
        />
      </Dialog>
    </>
  );
}

export default BuildingLeasesTab;
