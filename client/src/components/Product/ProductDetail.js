import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";

const ProductDetail = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;

  const [checked, setChecked] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/products/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.product));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/products/${id}`, {
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
    sendRequest().then(() => history("/products"));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {inputs && (
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
              value={inputs.productName}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="productName"
            />

            <FormLabel>ProductCateory</FormLabel>
            <TextField
              value={inputs.productCategory}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="productCategory"
            />

            <FormLabel>Quentity</FormLabel>
            <TextField
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
              Update Product
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default ProductDetail;
