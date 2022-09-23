import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { BACKEND_BASE_URL } from "../constant";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";
import JsPDF from "jspdf";

export default function OrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${BACKEND_BASE_URL}/api/auth/getOrders`);
      const data = await res.json();
      setOrders(data);
    };
    fetchUser(); // this function will called only once
  }, []); //empty dependency array means run only once when the component first renders

  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a2");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
  };

  let earnning = 0;

  orders.forEach((order) => {
    earnning += order.Amount;
  });

  return (
    <div>
      <IconButton aria-label="delete" href="/admin/customerHome">
        <ReplyIcon style={{ fontSize: "200%" }} />
      </IconButton>
      <div id="report">
        <Typography variant="h3" align="center" style={{ fontFamily: "serif" }}>
          Orders List
        </Typography>
        <Typography
          variant="h5"
          align="right"
          style={{ fontFamily: "serif", marginRight: "12%" }}
        >
          Total Earnnings{" "}
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#ee7600",
              fontSize: "120%",
              marginTop: "-8px",
              borderRadius: "15px",
              padding: "5px",
            }}
          >
            {" Rs. " + earnning}
          </div>
        </Typography>
        <TableContainer
          component={Paper}
          style={{ width: "85%", marginLeft: "5%", marginTop: "2%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", width: "25%" }}
                >
                  Customer ID
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Invoice ID
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    marginLeft: "240px",
                  }}
                >
                  Total Rs.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableContainer />
            <TableBody>
              {orders.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row._id}
                  </TableCell>
                  <TableCell align="center">{row.Name}</TableCell>
                  <TableCell align="center">{row._id}</TableCell>
                  <TableCell align="center">{row.Amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Box textAlign="center" style={{ marginTop: "10px" }}>
        <Button variant="contained" onClick={generatePDF}>
          Regerate Report
        </Button>
      </Box>
    </div>
  );
}
