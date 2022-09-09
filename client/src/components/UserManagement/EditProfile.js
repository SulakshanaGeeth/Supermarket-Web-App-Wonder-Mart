import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import React, { useState, useEffect, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import image from "./assets/Signup.jpg";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constant";
import SendIcon from "@mui/icons-material/Send";
import { confirm } from "react-confirm-box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function EditProfile() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const id = localStorage.getItem("id");
  const history = useNavigate();

  //   const checkUpdate = async () => {
  //     const result = await confirm("Are you sure?");
  //     if (result) {
  //       updateHandler();
  //     }
  //     console.log("You click No!");
  //   };

  function checkUpdate() {
    const confirmBox = window.confirm(
      "Do want to update this Profile Details ?"
    );
    if (confirmBox === true) {
      updateHandler();
    } else {
      history.push("/profile");
    }
  }

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

  //   function checkUpdate() {
  //     if (confirm() == true) updateHandler();
  //     else history("/profile");
  //   }

  const updateHandler = async (e) => {
    //update handler method
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `${BACKEND_BASE_URL}/api/auth/update/${id}`,
        { username, phoneNumber, email },
        config
      );

      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      toast.promise(resolveAfter3Sec, {
        pending: "Process ...",
        success: "Successfuly Updated 👌",
        error: "Upddate Faild 🤯",
      });

      setTimeout(() => {
        history("/profile");
      }, 3000); //3s
    } catch (error) {
      setError(error.response.data.error);
      toast.error(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 1000); //1s
    }
  };
  return (
    <Fragment>
      <Header />
      <div style={{ backgroundColor: "#d1dae8", marginTop: "-40px" }}>
        <Grid container spacing={0.3} style={{ padding: "45px" }}>
          <Grid item xs={5}>
            <Item style={{ paddingBottom: "260px" }}>
              <h1 style={{ color: "black" }}>My Account</h1>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  endIcon={<SendIcon />}
                  style={{
                    marginBottom: "20px",
                    marginLeft: "210px",
                    width: "350px",
                  }}
                >
                  Profile Edit
                </Button>
              </Link>
              <Button
                variant="outlined"
                style={{
                  display: "block",
                  marginLeft: "210px",
                  width: "350px",
                }}
              >
                Password Change
              </Button>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ color: "black" }}
                  >
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
                      autoFocus
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
                      autoFocus
                      value={phoneNumber}
                      onChange={(e) => setphoneNumber(e.target.value)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="success"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={checkUpdate}
                    >
                      Update Details
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Item>
          </Grid>
        </Grid>
      </div>
      <div style={{ marginTop: "-100px" }}>
        <Footer />
      </div>
    </Fragment>
  );
}

export default EditProfile;
