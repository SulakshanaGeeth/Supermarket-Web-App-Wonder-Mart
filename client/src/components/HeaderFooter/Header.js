import React from "react";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default class Header extends React.Component {
  ConfirmLogout = () => {
    const confirmBox = window.confirm("Do want to Logout ?");
    if (confirmBox == true) {
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.setItem("authToken", undefined);
      localStorage.removeItem("type");
      window.location("/");
    }
  };
  render() {
    return (
      <div className="header">
        {/* <h1>Header</h1> */}

        <Paper
          square
          sx={{
            backgroundColor: "#4caf50",
            height: "160px",
            marginBottom: "20px",
            marginTop: "-7px",
          }}
        >
          <IconButton square sx={{ marginLeft: "800px" }}>
            <AccountCircleIcon
              sx={{ height: "30px", width: "30px", color: "black" }}
            />
            <Typography
              sx={{ marginLeft: "10px", fontSize: "20px", color: "black" }}
            >
              Welcome Geeth
            </Typography>
          </IconButton>

          <IconButton square href="/" sx={{ marginLeft: "300px" }}>
            <LogoutIcon
              sx={{ height: "30px", width: "30px", color: "black" }}
            />
            <Typography
              href="/"
              onClick={this.ConfirmLogout}
              sx={{ marginLeft: "10px", fontSize: "20px", color: "black" }}
            >
              Log Out
            </Typography>
          </IconButton>

          <Typography
            sx={{
              marginTop: "10px",
              marginLeft: "10px",
              fontSize: "30px",
              fontWeight: "bold",
              fontFamily: "inherit",
            }}
          >
            {" "}
            WONDER MART{" "}
          </Typography>

          <Tabs
            aria-label="nav tabs example"
            sx={{ marginTop: "-50px", marginLeft: "400px" }}
          >
            <Tab
              label="Home"
              href="/home"
              sx={{ color: "white", marginLeft: "25px" }}
            />
            <Tab
              label="Products"
              href="/products"
              sx={{ color: "white", marginLeft: "25px" }}
            />
            <Tab
              label="Service"
              href="/spam"
              sx={{ color: "white", marginLeft: "25px" }}
            />
            <Tab
              label="About"
              href="/spam"
              sx={{ color: "white", marginLeft: "25px" }}
            />

            <IconButton square sx={{ marginLeft: "100px" }} href="/Cart">
              <ShoppingCartIcon
                sx={{ height: "30px", width: "30px", color: "black" }}
              />
              <Typography
                sx={{ marginLeft: "10px", fontSize: "20px", color: "white" }}
              >
                Cart
              </Typography>
            </IconButton>

            <IconButton square sx={{ marginLeft: "100px" }}>
              <ListAltIcon
                sx={{ height: "30px", width: "30px", color: "black" }}
              />
              <Typography
                sx={{ marginLeft: "10px", fontSize: "20px", color: "white" }}
              >
                Orders
              </Typography>
            </IconButton>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
