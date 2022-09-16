const express = require('express');
const router = express.Router();

const Cart = require('./../models/Cart');
const Product = require('./../models/product.model');

router.post('/add/:id',async (req,res) => {
    const objCart = await Cart.findOne({UserID:req.params.id});

    if(objCart) {
        if(objCart.Products.filter((obj) => obj.ProductID == req.body.Products.ProductID ).length == 1) {
            objCart.Products.filter((obj) => obj.ProductID == req.body.Products.ProductID )[0].Quantity += 1;
            objCart.Total += req.body.Products.ProductPrice;
            
        }else {
            objCart.Products.push(req.body.Products);
            objCart.Total += req.body.Products.ProductPrice;
        }

        await objCart.save()
            .then(() => res.json("New Item Added to the Cart Successfully"))
            .catch(err => res.status(404).json(err.message))

    } else {
        const product = [];
        product.push(req.body.Products);

        const cart = await new Cart({
            UserID : req.params.id,
            Products: product,
            Total : req.body.Products.ProductPrice
        }).save()
        .then(() => res.json("New User Cart Created Successfully"))
        .catch(err => res.json(err.message))
    }
})

router.get('/:id', (req, res) => {
    Cart
    .findOne({UserID:req.params.id})
    .then(result => res.json(result))
    .catch(err => err.json(err.message))
});

router.put('/edit/:id', async(req, res) => {
    const objCart = await Cart.findOne({UserID:req.params.id});

    if(objCart) {
        objCart.Products.filter((obj) => obj.ProductID == req.body.ProductID)[0].Quantity = req.body.Quantity;
        objCart.Total += req.body.ProductPrice;

        await objCart.save()
        .then(() => res.json("Quantity Updated"))
        .catch((err) => res.json(err.message))
    }else { 
        res.json("No Cart details Found!"); 
    }
});

router.delete('/delete/:id/:pid', async (req, res) => {
    const objCart = await Cart.findOne({UserID:req.params.id});

    // console.log(req.params.pid);

    if(objCart) {
        const qty = objCart.Products.filter((obj) => obj.ProductID == req.params.pid)[0].Quantity;
        const price = objCart.Products.filter((obj) => obj.ProductID == req.params.pid)[0].ProductPrice;
        objCart.Total -= (qty*price);
        
        objCart.Products.splice(objCart.Products.findIndex((obj) => obj.ProductID == req.params.pid), 1);

        await objCart.save()
        .then(() => res.json("Product Item Deleted"))
        .catch((err) => res.json(err.message))
    } else {
        res.json("No Cart Item details Found!"); 
    }
});

router.delete('/deleteAll/:id', async (req, res) =>{
    Cart.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Cart Deleted"))
    .catch((err) => res.json(err.message))
});

router.get('/getProduct/:type', async (req, res) => {
    Product.find({productCategory : req.params.type})
    .then((result) => res.json(result))
    .catch((err) => res.json(err.message))
});



module.exports = router;