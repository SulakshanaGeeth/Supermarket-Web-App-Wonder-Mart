import React, { useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constant";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function ProfileDetails() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const id = localStorage.getItem("id");
  const history = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${BACKEND_BASE_URL}/api/auth/get/${id}`);
      const data = await res.json();
      setUsername(data.username);
      setphoneNumber(data.phoneNumber);
      setEmail(data.email);
      console.log(username);
    };
    fetchUser();
  }, []);

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" style={{ color: "black" }}>
        Personal Information
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="Name"
          autoFocus
          value={username}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoComplete="phoneNumber"
          autoFocus
          value={phoneNumber}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </Box>
  );
}

export default ProfileDetails;
