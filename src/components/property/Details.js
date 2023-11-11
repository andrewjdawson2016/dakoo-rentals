import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { listProperties } from "../../api";
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import LeaseTabsBox from "../lease/TabsBox";
import LeaseAddForm from "../lease/AddForm";
import CloseIcon from "@mui/icons-material/Close";

function PropertyDetails() {
  const [leases, setLeases] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { address } = useParams();

  const refreshLeases = () => {
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
  };

  useEffect(() => {
    refreshLeases();
  }, [address]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    refreshLeases();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DaKoo Rentals
          </Typography>
        </Toolbar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {address}
          </Typography>
        </Toolbar>
        <Toolbar>
          <Button color="inherit" component={Link} to="/overview">
            Overview
          </Button>
          <Button color="inherit" component={Link} to="/leases">
            Leases
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Add Lease
        </Button>
        {leases.map((lease, index) => (
          <Box key={lease.id || index} mb={10}>
            <LeaseTabsBox lease={lease} refreshLeases={refreshLeases} />
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
    </>
  );
}

export default PropertyDetails;
