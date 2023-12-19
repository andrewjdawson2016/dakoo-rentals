import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";

function BuildingLeasesTab({ building }) {
  const [selectedUnit, setSelectedUnit] = useState("");

  useEffect(() => {
    if (building.building_type === "MULTI_FAMILY") {
      setSelectedUnit(building.units[0]?.unit_number);
    }
  }, [building]);

  const handleChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleAddNewLease = () => {
    console.log("Add New Lease Clicked");
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
    </>
  );
}

export default BuildingLeasesTab;
