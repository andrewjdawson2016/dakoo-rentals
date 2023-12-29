import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signup } from "../../../api";

function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      await signup(formData);
      navigate("/login");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm" style={{ paddingTop: "20px" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Signup
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleClick}
            color="primary"
            variant="contained"
            fullWidth
            style={{ marginTop: "24px" }}
          >
            Sign Up
          </Button>
          <Typography style={{ marginTop: "16px", textAlign: "center" }}>
            Already have an account?
            <Link
              component={RouterLink}
              to="/login"
              style={{ marginLeft: "5px" }}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export { SignupForm };
