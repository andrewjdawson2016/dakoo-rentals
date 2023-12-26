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
  Box,
} from "@mui/material";
import AddLeaseForm from "./AddLeaseForm";
import LeaseDetailsBox from "./LeaseDetailsBox";

function BuildingLeasesTab({ building, refreshBuilding }) {
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectedUnit = building.units[selectedUnitIndex];

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    const unitNumber = event.target.value;
    const unitIndex = building.units.findIndex(
      (unit) => unit.unit_number === unitNumber
    );
    setSelectedUnitIndex(unitIndex);
  };

  const handleAddNewLease = () => {
    setDialogOpen(true);
  };

  const onSubmitSuccess = () => {
    handleCloseDialog();
    refreshBuilding();
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
                  value={selectedUnit ? selectedUnit.unit_number : ""}
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
      {selectedUnit &&
        selectedUnit.leases.map((lease, index) => (
          <Box key={lease.id || index} mb={10}>
            <LeaseDetailsBox lease={lease} refreshBuilding={refreshBuilding} />
          </Box>
        ))}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <AddLeaseForm
          building={building}
          unit={selectedUnit}
          onSubmitSuccess={onSubmitSuccess}
        />
      </Dialog>
    </>
  );
}

export default BuildingLeasesTab;
