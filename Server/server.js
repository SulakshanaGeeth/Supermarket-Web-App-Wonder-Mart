const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Product Routes

const router = require("./routes/product.route");

dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //define connection
});

const connection = mongoose.connection; //assign database connection for a constant variable

connection.once("open", () => {
  //open connection for one time
  console.log("MongoDB connection was successful"); //display message in console when the connection was successful
});

const app = express();

//define a port for server
const PORT = process.env.PORT || 8070; //accually process.env.PORT is inbuilt

app.use(cors());
app.use(express.json()); //parse various different custom JSON types as JSO

//routes
const DpersonRouter = require("./routes/Dpersons.js");
app.use("/Dperson", DpersonRouter);
// middleware
app.use(express.json());
app.use("/products", router); // localhost:8070/products

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});

app.use("/api/auth", require("./routes/auth"));

app.use("/cart", require("./routes/Cart"));
