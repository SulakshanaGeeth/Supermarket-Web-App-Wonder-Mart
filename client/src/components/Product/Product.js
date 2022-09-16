import React from "react";
import { Button } from "@mui/material";
import "./Product.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = (props) => {
  const history = useNavigate();
  const {
    _id,
    productName,
    productCategory,
    quentity,
    price,
    image,
    available,
  } = props.product;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:8070/products/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/products"));
  };

  return (
    <div className="card">
      <img src={image} alt={productName} />
      <h3>{productName}</h3>
      <p>Category : {productCategory}</p>
      <h4>Quantity : {quentity}</h4>
      <h3>LKR:{price}.00/=</h3>
      <h3>{available}</h3>
      <Button LinkComponent={Link} to={`/admin/product/${_id}`}>
        Update
      </Button>
      <Button onClick={deleteHandler}>Delete</Button>
    </div>
  );
};

export default Product;
