import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Authentication: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = useState(false); // State for error dialog
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic
    let data = localStorage.getItem("login");
    if (data) {
      // Parse the stored data as JSON
      const parsedData = JSON.parse(data);
      // Check if the entered username and password match the stored data
      if (parsedData.email === username && parsedData.password === password) {
        console.log("Success: Logged in");
        localStorage.setItem("isLogin", "true");
        navigate("/home");
        window.location.reload();
      } else {
        setErrorMessage("Error: Invalid username or password or do the signup"); // Set error message
        setOpenErrorDialog(true); // Open error dialog
        console.log("Error: Invalid username or password");
      }
    } else {
      setErrorMessage("Error: No login data found"); // Set error message
      setOpenErrorDialog(true); // Open error dialog
      console.log("Error: No login data found");
    }
  };

  const handleSignup = () => {
    // Handle signup logic
    console.log("Signed up with:", signupEmail, signupPassword);
    let login = { email: signupEmail, password: signupPassword };
    // Save signup details to localStorage or perform any necessary actions
    setOpenSignupDialog(false); // Close the signup dialog
    localStorage.setItem("login", JSON.stringify(login));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          }
          label="Show Password"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => setOpenSignupDialog(true)}
        >
          Signup
        </Button>
      </Box>
      <Dialog
        open={openSignupDialog}
        onClose={() => setOpenSignupDialog(false)}
      >
        <DialogTitle>Signup</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSignupDialog(false)}>Cancel</Button>
          <Button onClick={handleSignup} color="primary">
            Signup
          </Button>
        </DialogActions>
      </Dialog>
      {/* Error dialog */}
      <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenErrorDialog(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Authentication;
