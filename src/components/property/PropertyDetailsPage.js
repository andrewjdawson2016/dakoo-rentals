import React, { useEffect, useCallback, useState } from "react";
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

function PropertyDetailsPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

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
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <img
                src="/logo.png"
                alt="DaKoo Rentals"
                style={{ height: "50px" }}
              />
            </Link>
          </Typography>
        </Toolbar>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            {address}
          </Typography>
        </Toolbar>
        <Toolbar>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Overview" />
            <Tab label="Leases" />
          </Tabs>
          {value === 0 && OverviewTab}
          <Button
            color="inherit"
            component={Link}
            to={`/${encodeURIComponent(address)}/overview`}
            style={{ color: "black" }}
          >
            Overview
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={`/${encodeURIComponent(address)}/leases`}
            style={{ color: "black" }}
          >
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

export default PropertyDetailsPage;
