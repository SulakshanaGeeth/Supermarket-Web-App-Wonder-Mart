import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import loginImg from "./assets/Login.jpg";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constant";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    //handler method for login
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/api/auth/login`,
        { email, password },
        config
      );

      const username = data?.username.split(" ");

      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", username?.[0]);
      localStorage.setItem("email", data.email);
      localStorage.setItem("id", data._id);
      localStorage.setItem("type", data?.type);

      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      toast.promise(resolveAfter3Sec, {
        pending: "Login ...",
        // success: "Login Success 👌",
        error: "Login Faild 🤯",
      });
      setTimeout(() => {
        // set a 3seconds timeout for authentication

        if (data.type === "user") {
          navigate("/home");
        } else if (data.type === "admin") {
          navigate("/admin/adminHome");
        }
      }, 3000);
    } catch (error) {
      setError(error.response.data.error);
      toast.error(error.response.data.error);
      setPassword("");
      setTimeout(() => {
        setError("");
      }, 3000); //3s
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#dfc8a2",
          minHeight: "100vh",
          // marginTop: "24px",
          // margin: "-8px",
        }}
      >
        <Grid
          container
          spacing={0.3}
          style={{ padding: "45px", paddingTop: "150px" }}
        >
          <Grid item xs={5}>
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
                    Login
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={loginHandler}
                    noValidate
                    sx={{ mt: 1 }}
                  >
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
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="success"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
                    <Grid
                      container
                      style={{
                        justifyContent: "center",
                        paddingBottom: "48px",
                      }}
                    >
                      <Grid item>
                        <Link href="/register" variant="body2">
                          {"If You Don't Have an account? Signup"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item>
              <img
                src={loginImg}
                style={{
                  height: "400px",
                }}
                alt="Logo"
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
