import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constant";

function EditProfile() {
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

  const updateHandler = (e) => {
    e.preventDefault();
    const confirmBox = window.confirm(
      "Do want to update this Profile Details ?"
    );
    if (confirmBox === true) {
      axios
        .put(`${BACKEND_BASE_URL}/api/auth/update/${id}`, {
          username,
          phoneNumber,
          email,
        })
        .then(() => {
          toast.success("Update Successfuly");
          history("/profile/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

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
        Edit Personal Information
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoComplete="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2 }}
          onClick={updateHandler}
        >
          Update Details
        </Button>
      </Box>
    </Box>
  );
}

export default EditProfile;
