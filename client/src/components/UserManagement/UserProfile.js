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

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import ProfileDetails from "./ProfileDetails";

import EditProfile from "./EditProfile";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function UserProfile() {
  return (
    <Fragment>
      <div>
        <Header />
      </div>
      <div
        style={{
          backgroundColor: "#d1dae8",
          marginTop: "0px",
        }}
      >
        <Grid
          container
          spacing={0.3}
          style={{ padding: "45px", marginBottom: "40px" }}
        >
          <Grid item xs={5}>
            <Item
              style={{
                display: "block",
                boxSizing: "border-box",
                height: "300px",
                backgroundColor: "#7ed321",
                clipPath: "ellipse(93% 100% at 77.09% 0%)",
                paddingBottom: "30px",
              }}
            >
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h3"
                  style={{
                    fontFamily: "Times New Roman, Times, serif",
                    marginBottom: "20px",
                  }}
                >
                  <a href="/profile/" style={{ color: "black" }}>
                    My Profile
                  </a>
                </Typography>
              </ThemeProvider>

              <Link to="/profile/edit/" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    ":hover": {
                      bgcolor: "#25be6a",
                      color: "white",
                    },
                  }}
                  startIcon={<AccountCircleIcon style={{ fontSize: "350%" }} />}
                  style={{
                    marginBottom: "20px",
                    marginLeft: "20%",
                    width: "350px",
                  }}
                >
                  Edit Profile
                </Button>
              </Link>
              <Button
                variant="outlined"
                sx={{
                  ":hover": {
                    bgcolor: "#25be6a",
                    color: "white",
                  },
                }}
                startIcon={<PasswordIcon style={{ fontSize: "350%" }} />}
                style={{
                  marginLeft: "20%",
                  width: "350px",
                }}
              >
                Change Password
              </Button>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                {window.location.pathname === `/profile/` && <ProfileDetails />}
                {window.location.pathname === `/profile/edit/` && (
                  <EditProfile />
                )}
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

export default UserProfile;
