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
import { login } from "../../../api";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      const loginResponse = await login(formData);
      navigate("/", { state: { user: loginResponse } });
    } catch (error) {
      setErrorMessage("Incorrect username or password");
    }
  };

  return (
    <Container maxWidth="sm" style={{ paddingTop: "20px" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {errorMessage && (
            <Typography color="error" style={{ marginBottom: "16px" }}>
              {errorMessage}
            </Typography>
          )}
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
            Log In
          </Button>
          <Typography style={{ marginTop: "16px", textAlign: "center" }}>
            Don't have an account?
            <Link
              component={RouterLink}
              to="/signup"
              style={{ marginLeft: "5px" }}
            >
              Signup
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export { LoginForm };
