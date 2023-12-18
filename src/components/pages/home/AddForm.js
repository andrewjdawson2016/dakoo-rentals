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
import { createBuilding } from "../../../api";
import { parseAndFormatMonthlyMoneyValue } from "../../../util";
import SnackbarAlert from "../../common/SnackbarAlert";

function AddForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    address: "",
    building_type: "",
    unit_numbers: [],
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleSubmit = () => {
    createBuilding({ ...formData })
      .then(() => {
        console.log("Building created successfully");
        setFormData({
          nickname: "",
          address: "",
          building_type: "",
          unit_numbers: [],
        });
      })
      .catch((e) => {
        console.error("Error creating building");
        setSnackbarMessage(`Error creating building: ${e.message}`);
        setSnackbarOpen(true);
      });
  };

  return (
    <Container component="main" maxWidth="md">
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
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Building Type</FormLabel>
        <RadioGroup
          row
          name="building_type"
          value={formData.building_type}
          onChange={handleChange}
        >
          <FormControlLabel
            value="single"
            control={<Radio />}
            label="Single Family"
          />
          <FormControlLabel
            value="multi"
            control={<Radio />}
            label="Multi-Family"
          />
        </RadioGroup>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: 16 }}
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
