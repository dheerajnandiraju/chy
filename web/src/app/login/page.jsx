"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {login} = useAuth();

  const handleLogin = () => {
    // Simple validation (for demonstration purposes)
    if (email === "user@example.com" && password === "password123") {
      // Simulate a successful login (e.g., store user info in localStorage)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      router.push("/"); // Redirect to dashboard or any other page
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#121212", // Dark background for the page
      }}
    >
      <Box
        sx={{
          backgroundColor: "white", // White background for the form container
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          position: "relative",
          border: "none", // Removed top and right border
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#000" }}>
          Login
        </Typography>

        {/* Glowing Inputs */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 3,
            input: {
              borderRadius: 2,
              padding: "12px 15px",
              backgroundColor: "#f7f7f7", // Light background for the input fields
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#fff", // White border on hover
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderTop: "none", // Remove top border
                borderRight: "none", // Remove right border
              },
            },
            "& .MuiInputBase-input": {
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)", // White glow effect
              transition: "box-shadow 0.3s ease-in-out",
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            input: {
              borderRadius: 2,
              padding: "12px 15px",
              backgroundColor: "#f7f7f7", // Light background for the input fields
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#fff", // White border on hover
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderTop: "none", // Remove top border
                borderRight: "none", // Remove right border
              },
            },
            "& .MuiInputBase-input": {
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)", // White glow effect
              transition: "box-shadow 0.3s ease-in-out",
            },
          }}
        />

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#000", // Black background for the button
            color: "#fff", // White text for the button
            "&:hover": {
              backgroundColor: "#fff", // White background on hover
              color: "#000", // Black text on hover
              boxShadow: "0 8px 20px rgba(255, 255, 255, 0.4)", // White glow on hover
            },
          }}
        >
          Log In
        </Button>

        <Box mt={2} sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#000" }}>
            Don't have an account?{" "}
            <a href="/signup" style={{ color: "#blue", fontWeight: "bold" }}>
              Sign Up
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
