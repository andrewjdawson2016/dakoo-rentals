import React, { useState } from "react";
import {
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import { createBuilding } from "../../../../api";
import SnackbarAlert from "../../../common/SnackbarAlert";

function AddForm({ onSuccessfulSubmit }) {
  const [formData, setFormData] = useState({
    nickname: "",
    address: "",
    building_type: "",
    unit_numbers: "",
    first_rental_month: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const processedFormData = {
      ...formData,
      unit_numbers: formData.unit_numbers
        .split(",")
        .map((unit) => unit.trim())
        .filter((unit) => unit !== ""),
    };

    createBuilding(processedFormData)
      .then(() => {
        console.log("Building created successfully", processedFormData);
        setFormData({
          nickname: "",
          address: "",
          building_type: "",
          unit_numbers: "",
          first_rental_month: "",
        });
        onSuccessfulSubmit();
      })
      .catch((e) => {
        console.error("Error creating building", e);
        setSnackbarMessage(`Error creating building: ${e.message}`);
        setSnackbarOpen(true);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Building Type</FormLabel>
        <RadioGroup
          row
          name="building_type"
          value={formData.building_type}
          onChange={handleChange}
        >
          <FormControlLabel
            value="SINGLE_FAMILY"
            control={<Radio />}
            label="Single Family"
          />
          <FormControlLabel
            value="MULTI_FAMILY"
            control={<Radio />}
            label="Multi-Family"
          />
        </RadioGroup>
      </FormControl>

      {formData.building_type === "MULTI_FAMILY" && (
        <FormControl fullWidth margin="normal">
          <TextField
            label="Unit Numbers (comma-separated)"
            name="unit_numbers"
            value={formData.unit_numbers}
            onChange={handleChange}
            helperText="Enter unit numbers separated by commas"
          />
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <TextField
          label="Nickname"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="First Rental Month (YYYY-MM)"
          name="first_rental_month"
          value={formData.first_rental_month}
          onChange={handleChange}
          required
          helperText="Enter the first rental month in YYYY-MM format"
        />
      </FormControl>

      <Button
        type="submit"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: 16, marginBottom: 20 }}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>

      <SnackbarAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default AddForm;
