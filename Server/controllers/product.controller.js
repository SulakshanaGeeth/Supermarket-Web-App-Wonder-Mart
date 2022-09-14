const Product = require("../models/product.model");


const getAllProduct = async (req,res,next)=>{
    let products;
    try{
        products = await Product.find();
    } catch (err) {
        console.log(err);
    }

    if (!products){
        return res.status(404).json({message:"NO Product Found"})
    }
    return  res.status(200).json({products})
}


const  getById= async(req,res,next)=>{
    const id = req.params.id;
    let product;
    try {
        product = await Product.findById(id);
    } catch (err) {
        console.log(err)
    }
    if (!product) {
        return res.status(500).json({message:"UNo Product Found"});
    }
    return res.status(201).json({ product});
};


// add new book to database

const addProduct = async (req,res,next) => {
    const {productName,productCategory,quentity,price,image,available} = req.body;
    let product;

    try {
        product = new Product({

            productName,
            productCategory,
            quentity,
            price,
            image,
            available
        });
        await product.save();
    } catch (err){
        console.log(err);
    }

    if (!product) {
        return res.status(500).json({message:"Unable to Add Product"});
    }
    return res.status(201).json({ product});
};



const updateProduct = async(req,res,next) =>{
    const id = req.params.id;
    const {productName,productCategory,quentity,price,image,available} = req.body;
    let product;

    try {
        product = await Product.findByIdAndUpdate(id, {

            productName,
            productCategory,
            quentity,
            price,
            image,
            available
        });
        product = await  product.save();
    } catch (err) {
        console.log(err);
    }

    if (!product) {
        return res.status(404).json({message:"Unable to update by this id"});
    }
    return res.status(200).json({ product});

};

const deleteProduct = async (req,res,next)=>{
    const id = req.params.id;
    let product;
    try {
        product = await Product.findByIdAndRemove(id)
    }catch (err) {
        console.log(err);
    }
    if (!product) {
        return res.status(404).json({message:"Unable to delete Product"});
    }
    return res.status(200).json({message : "Product Successfully deleted"});

}




exports.getAllProduct = getAllProduct;
exports.addProduct =addProduct;
exports.getById=getById;
exports.updateProduct=updateProduct;
exports.deleteProduct=deleteProduct;



// const addProduct = async (ctx)=>{
//
//     try {
//         const {productId,productName,productCategory,quentity,price}=ctx.request.body;
//
//     const product = await Product.create({
//         productId:productId,
//         productName:productName,
//         productCategory:productCategory,
//         quentity:quentity,
//         price:price,
//     });
//     return (ctx.body=product);
//     } catch (error) {
//         return (ctx.body={ message:error.message});
//     }
//
//
// };









//
// const getProduct = async (ctx)=>{
//
//     try {
//         const products = await Product.find({});
//         return (ctx.body=products);
//     } catch (error) {
//         return (ctx.body={ message:error.message});
//
//     }
//
// };
//
// const updateProduct = async(ctx)=>{
//     try {
//         const productsId = ctx.params.productsId;
//         // let course = await Course.findById(productsId);
//         // if (!course){
//         //     throw new Error("Course not Found");
//         // }
//         const { productId,productName,productCategory,quentity,price} =ctx.request.body;
//         const product = await Product.findByIdAndUpdate(productsId,{
//             productId:productId,
//             productName:productName,
//             productCategory:productCategory,
//             quentity:quentity,
//             price:price,
//
//
//         })
//         return (ctx.body = product);
//     } catch (error) {
//         return (ctx.body={ message:error.message});
//
//     }
// };
//
//
//
// const deleteProduct = async (ctx)=>{
//     try {
//         const productsId = ctx.params.productsId;
//         const product = await Course.findByIdAndDelete(productsId);
//         return (ctx.body = product);
//     } catch (error) {
//         return (ctx.body={ message:error.message});
//
//     }
// };

