import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { listProperties } from "../../../api";
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import LeaseDetailsBox from "../../lease/LeaseDetailsBox";
import LeaseAddForm from "../../lease/LeaseAddForm";
import CloseIcon from "@mui/icons-material/Close";

function LeasesTab() {
  const [leases, setLeases] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { address } = useParams();

  const refreshLeases = useCallback(() => {
    listProperties()
      .then((properties) => {
        const property = properties.find((p) => p.address === address);
        if (property) {
          setLeases(property.leases);
        }
      })
      .catch((e) => {
        console.error("Error fetching properties: ", e.message);
      });
  }, [address]);

  useEffect(() => {
    refreshLeases();
  }, [address, refreshLeases]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    refreshLeases();
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: "20px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Leases</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
          >
            Add Lease
          </Button>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      {leases.map((lease, index) => (
        <Box key={lease.id || index} mb={10}>
          <LeaseDetailsBox lease={lease} refreshLeases={refreshLeases} />
        </Box>
      ))}

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New Lease
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <LeaseAddForm
            currentAddress={address}
            onSubmitSuccess={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default LeasesTab;
