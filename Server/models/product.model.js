const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  // productId: {
  //   type: String,
  //
  // },

  productName: {
    type: String,
    required: true
  },

  productCategory: {
    type: String,
    required: true
  },

  quentity: {
    type: Number,
    required: true
  },

  price: {
    type: Number ,
    required: true

  },
  image:{
    type:String,
    required: true
  },

  available:{
    type:Boolean,
  }

});

module.exports = mongoose.model("Product",productSchema);