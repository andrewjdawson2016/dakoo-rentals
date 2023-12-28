import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Dialog,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AddForm from "./AddForm";
import { formatDateToMonthYear } from "../../../../util";

function HomeBuildingsTab({ buildings, onRefresh }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddNewProperty = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {building.nickname}
                </Typography>
                <Typography color="text.secondary">
                  {building.address}
                </Typography>
                <Typography color="text.secondary">
                  {building.units.length} units
                </Typography>
                <Typography color="text.secondary">
                  Started renting in{" "}
                  {formatDateToMonthYear(building.first_rental_month)}
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
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
