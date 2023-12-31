import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Dialog,
  Card,
  CardContent,
} from "@mui/material";
import AddForm from "./AddForm";
import { formatDateToMonthYear } from "../../../../util";

function HomeBuildingsTab({ buildings, onRefresh }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddNewProperty = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleBuildingDetails = (buildingId) => {
    navigate(`/${buildingId}`);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Buildings</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewProperty}
          >
            Add Building
          </Button>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />

      <Grid container spacing={2}>
        {buildings.map((building, index) => (
          <Grid item key={index} xs={12} sm={6} lg={4}>
            <Button
              onClick={() => handleBuildingDetails(building.id)}
              style={{ padding: 0, width: "100%" }}
            >
              <Card sx={{ maxWidth: 345, minHeight: 200 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {building.nickname}
                  </Typography>
                  <Typography color="text.secondary">
                    {building.address}
                  </Typography>
                  <Typography color="text.secondary">
                    {building.units.length}{" "}
                    {building.units.length > 1 ? "units" : "unit"}
                  </Typography>
                  <Typography color="text.secondary">
                    Started renting{" "}
                    {formatDateToMonthYear(building.first_rental_month)}
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </Grid>
        ))}
      </Grid>

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

export default HomeBuildingsTab;
