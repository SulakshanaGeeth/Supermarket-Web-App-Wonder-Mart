import React, { useState, Fragment } from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    productName: "",
    productCategory: "",
    quentity: "",
    price: "",
    image: "",
  });

  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name,"value",e.target.value);
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:8070/products/", {
        productName: String(inputs.productName),
        productCategory: String(inputs.productCategory),
        quentity: Number(inputs.quentity),
        price: Number(inputs.price),
        image: String(inputs.image),
        available: Boolean(checked),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, checked);
    sendRequest().then(() => history("/admin/products"));
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          maxWidth={700}
          alignContent={"center"}
          alignSelf={"center"}
          marginLeft={"auto"}
          marginRight={"auto"}
          marginTop={5}
        >
          <FormLabel>ProductName</FormLabel>
          <TextField
            placeholder={"Eg:Munchee"}
            value={inputs.productName}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="productName"
          />
          <FormLabel>ProductCateory</FormLabel>
          <TextField
            placeholder={"Eg:Milk,Food,Fruits,FreshMilk,Other"}
            value={inputs.productCategory}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="productCategory"
          />
          <FormLabel>Quentity</FormLabel>
          <TextField
            placeholder={"1-1000"}
            value={inputs.quentity}
            onChange={handleChange}
            type={"number"}
            margin="normal"
            fullWidth
            variant="outlined"
            name="quentity"
          />
          <FormLabel>Price</FormLabel>
          <TextField
            placeholder={"LKR"}
            value={inputs.price}
            onChange={handleChange}
            type={"number"}
            margin="normal"
            fullWidth
            variant="outlined"
            name="price"
          />
          <FormLabel>Image</FormLabel>
          <TextField
            placeholder={"Add image "}
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="image"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label="Available"
          />
          <Button variant={"contained"} type={"submit"}>
            Add Product
          </Button>
        </Box>
      </form>
    </Fragment>
  );
};

export default AddProduct;
