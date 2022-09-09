import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import image from "./assets/Signup.jpg";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate, Redirect } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constant";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);
  const type = "user";

  const history = useNavigate();

  const registerHandler = async (e) => {
    //register handler method
    e.preventDefault();

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      //method for cheking the password an confirm password
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      await axios.post(
        `${BACKEND_BASE_URL}/api/auth/register`,
        { username, phoneNumber, email, password, type },
        config
      );

      setTimeout(() => {
        // notification.info({
        //   message: `You are successfully registered.`,
        //   description: "You can access to the system using your credentials.",
        //   placement: "top",
        // });
        setLoading(false);
        history("/"); // after 5seconds it will redirect to the login
        // this.props.history.push("/");
      }, 3000); //5s
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 3000); //5s
    }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#dfc8a2",
          minHeight: "97vh",
          // marginTop: "24px",
          // margin: "-8px",
        }}
      >
        <Grid container spacing={0.3} style={{ padding: "45px" }}>
          <Grid item xs={6}>
            <Item>
              <img
                src={image}
                style={{
                  height: "595px",
                  // padding: "0px",
                  // marginLeft: "0px",
                  // paddingTop: "80px",
                  // paddingBottom: "80px",
                }}
                alt="Logo"
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
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
                    Register
                  </Typography>
                  <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
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
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      autoFocus
                      value={phoneNumber}
                      onChange={(e) => setphoneNumber(e.target.value)}
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
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Confirm Password"
                      type="password"
                      id="Repassword"
                      autoComplete="current-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="success"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={registerHandler}
                    >
                      Register
                    </Button>
                    <Grid container style={{ justifyContent: "center" }}>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Have an account? Login"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
