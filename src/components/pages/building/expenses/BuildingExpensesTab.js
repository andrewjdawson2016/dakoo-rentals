import React, { useState } from "react";
import { Grid, Typography, Divider, Button, Dialog } from "@mui/material";
import LogExpensesForm from "./LogExpensesForm";
function BuildingExpensesTab({ building, refreshBuilding }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleLogExpenses = () => {
    setDialogOpen(true);
  };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Expenses</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogExpenses}
          >
            Log Expenses
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <LogExpensesForm />
      </Dialog>
    </>
  );
}

export default BuildingExpensesTab;
