import { Schema, model } from "mongoose";
import  User  from "./user.js";
import  Store  from "./store.js";
import { v4 as uuidv4 } from "uuid";

const productSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  userId: {
    type: String,
    ref: User,
    required: true,
  },
  storeId: {
    type: String,
    ref: Store,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,          
    contentType: String,        
  }

});

const Product = model("product", productSchema);

export default Product;