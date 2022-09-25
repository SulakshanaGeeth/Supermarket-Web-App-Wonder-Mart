const express = require("express");
const router = express.Router();

const Order = require("./../models/Order");

router.post("/add", async (req, res) => {
  const Orders = await new Order({
    UserID: req.body.UserID,
    Name: req.body.Name,
    Address: req.body.Address,
    Mobile: req.body.Mobile,
    Email: req.body.Email,
    Card: req.body.Card,
    Products: req.body.Products,
    Amount: req.body.Amount,
    Rider: false,
    Deliver: false,
    Cancelled: false,
    Refund: false,
  })
    // console.log(Orders);
    .save()
    .then(() => res.json("Order Placed Successfully"))
    .catch((err) => res.status(400).json(err.message));

  //console.log(Orders);
});

router.get("/", async (req, res) => {
  Order.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/place", async (req, res) => {
  Order.find({ Deliver: "false", Rider: "false",Cancelled: "false" })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/sending", async (req, res) => {
  Order.find({ Deliver: "false", Rider: "true",Cancelled: "false" })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/cancelled/pen", async (req, res) => {
  Order.find({ Deliver: "false", Rider: "false",Cancelled: "true", Refund:'false' })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/cancelled/", async (req, res) => {
  Order.find({ Deliver: "false", Rider: "false",Cancelled: "true", Refund:'true' })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/:id", async (req, res) => {
  Order.find({ UserID: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/item/:id", async (req, res) => {
  Order.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/deliverd/:id", async (req, res) => {
  await Order.find({ 
    UserID: req.params.id, 
    Deliver: "true" 
    })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/receiving/:id", async (req, res) => {
  await Order.find({
    UserID: req.params.id,
    Deliver: "false",
    Rider: "true",
    Cancelled: "false",
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/place/:id", async (req, res) => {
  Order.find({
    UserID: req.params.id,
    Deliver: "false",
    Rider: "false",
    Cancelled: "false",
    })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.get("/cancelled/:id", async (req, res) => {
  await Order.find({ 
    UserID: req.params.id, 
    Cancelled: "true" 
    })
    .then((result) => res.json(result))
    .catch((err) => res.status(err.message));
});

router.put("/Rider/:id", async (req, res) => {
  const obj = await Order.findById(req.params.id);
  obj.Rider = true;
  obj
    .save()
    .then(() => res.json("Rider Assigned Successfully"))
    .catch((err) => res.json(`Error: ${err}`));
});

router.put("/Deliver/:id", async (req, res) => {
  const obj = await Order.findById(req.params.id);
  obj.Deliver = true;
  obj
    .save()
    .then(() => res.json("Order Delivered Successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.put("/cancelled/:id", async (req, res) => {
  const obj = await Order.findById(req.params.id);
  obj.Cancelled = true;
  obj
    .save()
    .then(() => res.json("Order Cancelled Successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.put("/refund/:id", async (req, res) => {
  const obj = await Order.findById(req.params.id);
  obj.Refund = true;
  obj
    .save()
    .then(() => res.json("Order Cancelled Successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("Order Cancelled Successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
