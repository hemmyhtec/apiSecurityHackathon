import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const productSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4
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