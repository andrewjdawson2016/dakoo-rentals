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

function NewLeaseForm() {
  const [displayedRent, setDisplayedRent] = useState("");

  const handleRentChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue, 10);

    setFormData((prev) => ({
      ...prev,
      price_per_month: numericValue,
    }));

    const formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);

    setDisplayedRent(formattedValue);
  };

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/properties`)
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    fetch(`${process.env.REACT_APP_SERVER_URL}/leases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Lease created successfully:", data);
      })
      .catch((error) => {
        console.error("Error creating lease:", error);
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

          <FormControlLabel
            control={
              <Switch
                checked={formData.is_renewal}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_renewal: e.target.checked,
                  }))
                }
                name="is_renewal"
                color="primary"
              />
            }
            label="Is Renewal"
          />

          {!formData.is_renewal && (
            <div>
              {formData.tenants.map((tenant, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Tenant Name"
                      value={tenant.name}
                      onChange={(e) =>
                        handleTenantChange(index, "name", e.target.value)
                      }
                      required
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
                        handleTenantChange(index, "email", e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={2}>
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
                  </Grid>
                </Grid>
              ))}
            </div>
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
    </Container>
  );
}

export default NewLeaseForm;
