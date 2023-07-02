import { Schema, model } from "mongoose";
import  User  from "./user.js";
import  Store  from "./store.js";
import { v4 as uuidv4 } from "uuid";

const productSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  product_title: {
    type: String,
    required: true
  },
  product_description: {
    type: String,
    required: true
  },
  product_category: {
    type: String,
    required: true
  },
  product_price: {
    type: String,
    required: true
  },
  product_stock: {
    type: String,
    required: true
  },
  product_availability: {
    type: Boolean,
    default: true,
    required: true
  },
  product_image: {
    data: Buffer,          
    contentType: String,        
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  storeId: {
    type: String,
    ref: "Store",
    required: true,
  },

});

const Product = model("product", productSchema);

export default Product;