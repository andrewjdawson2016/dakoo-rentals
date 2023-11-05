import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Container,
  Paper,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DateTime } from "luxon";
import { listProperties, createLease } from "../api";
import SnackbarComponent from "./SnackbarComponent";
import { parseAndFormatRent } from "../util";

function NewLeaseForm() {
  const [displayedRent, setDisplayedRent] = useState("");
  const [formData, setFormData] = useState({
    property_id: "",
    start_date: "",
    end_date: "",
    price_per_month: "",
    is_renewal: false,
    note: "",
    tenants: [{ name: "", email: "" }],
  });
  const [properties, setProperties] = useState([]);
  // TODO: convert this to an index instead
  const [selectedProperty, setSelectedProperty] = useState(null);
  // TODO: factor out snackbar into its own react child component
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [reloadProperties, setReloadProperties] = useState(0);
  const [previousTenants, setPreviousTenants] = useState([]);

  useEffect(() => {
    listProperties()
      .then((properties) => {
        setProperties(properties);
      })
      .catch((e) => {
        console.error("Error fetching properties:", e.message);
      });
  }, [reloadProperties]);

  const handleRentChange = (event) => {
    const { numericValue, formattedValue } = parseAndFormatRent(
      event.target.value
    );
    setFormData((prev) => ({
      ...prev,
      price_per_month: numericValue,
    }));
    setDisplayedRent(formattedValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "property_id") {
      const property = properties.find((p) => p.id === value);
      setSelectedProperty(property);
    }
    if (name === "is_renewal") {
      if (
        e.target.checked &&
        selectedProperty &&
        selectedProperty.leases &&
        selectedProperty.leases.length > 0
      ) {
        const lastLease = selectedProperty.leases[0];
        const lastLeaseEndDate = lastLease.end_date;
        const newStartDate = DateTime.fromISO(lastLeaseEndDate)
          .plus({ days: 1 })
          .toISODate();

        setPreviousTenants(lastLease.tenants);

        setFormData((prev) => ({
          ...prev,
          start_date: newStartDate,
          [name]: e.target.checked,
        }));
        return;
      } else {
        setPreviousTenants([]);
        setFormData((prev) => ({
          ...prev,
          start_date: "",
          [name]: e.target.checked,
        }));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTenantChange = (index, field, value) => {
    const updatedTenants = [...formData.tenants];
    updatedTenants[index][field] = value;
    setFormData((prev) => ({ ...prev, tenants: updatedTenants }));
  };

  const addTenant = () => {
    setFormData((prev) => ({
      ...prev,
      tenants: [...prev.tenants, { name: "", email: "" }],
    }));
  };

  const removeTenant = (index) => {
    const updatedTenants = [...formData.tenants];
    updatedTenants.splice(index, 1);
    setFormData((prev) => ({ ...prev, tenants: updatedTenants }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let dataToSend = { ...formData };

    if (
      formData.is_renewal ||
      (formData.tenants.length === 1 &&
        !formData.tenants[0].name &&
        !formData.tenants[0].email)
    ) {
      delete dataToSend.tenants;
    }

    // TODO: I think this should be using dataToSend rather than formData
    createLease({
      property_id: formData.property_id,
      start_date: formData.start_date,
      end_date: formData.end_date,
      price_per_month: formData.price_per_month,
      is_renewal: formData.is_renewal,
      note: formData.note,
      tenants: formData.tenants,
    })
      .then(() => {
        console.log("Lease created successfully:");
        setFormData({
          property_id: "",
          start_date: "",
          end_date: "",
          price_per_month: "",
          is_renewal: false,
          note: "",
          tenants: [{ name: "", email: "" }],
        });
        setDisplayedRent("");
        setReloadProperties((prev) => prev + 1);
      })
      .catch((e) => {
        console.error("Error creating lease:", e);
        setSnackbarMessage(`Error creating lease: ${e.message}`);
        setSnackbarOpen(true);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6" align="center">
          Create New Lease
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="property_id">Property</InputLabel>
            <Select
              label="Property"
              name="property_id"
              value={formData.property_id}
              onChange={handleChange}
              id="property_id"
            >
              {properties.map((property) => (
                <MenuItem key={property.id} value={property.id}>
                  {property.address}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedProperty &&
            selectedProperty.leases &&
            selectedProperty.leases.length > 0 && (
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_renewal}
                    onChange={handleChange}
                    name="is_renewal"
                    color="primary"
                  />
                }
                label="Is Renewal"
              />
            )}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                label="Start Date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                disabled={formData.is_renewal}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                label="End Date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            margin="normal"
            label="Rent"
            name="price_per_month"
            value={displayedRent}
            onChange={handleRentChange}
            required
          />

          {(formData.is_renewal ? previousTenants : formData.tenants).map(
            (tenant, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Tenant Name"
                    value={tenant.name}
                    onChange={(e) =>
                      !formData.is_renewal &&
                      handleTenantChange(index, "name", e.target.value)
                    }
                    required
                    disabled={formData.is_renewal}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Tenant Email"
                    type="email"
                    value={tenant.email}
                    onChange={(e) =>
                      !formData.is_renewal &&
                      handleTenantChange(index, "email", e.target.value)
                    }
                    required
                    disabled={formData.is_renewal}
                  />
                </Grid>
                <Grid item xs={2}>
                  {!formData.is_renewal && (
                    <>
                      <IconButton
                        onClick={() => removeTenant(index)}
                        disabled={formData.tenants.length === 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {index === formData.tenants.length - 1 && (
                        <IconButton onClick={addTenant}>
                          <AddIcon />
                        </IconButton>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            )
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Optional Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
      <SnackbarComponent
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </Container>
  );
}

export default NewLeaseForm;
