import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4();


const productSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
    required: true
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
  // product_image: {
  //   data: Buffer,          
  //   contentType: String,        
  // },
  userId: {
    type: String,
    ref: "User",
    required: true,
    default: uuid
  },
  storeId: {
    type: String,
    ref: "Store",
    required: true,
    default: uuid
  },

});

productSchema.index({ product_description
  : 'text' });

const Product = model("Product", productSchema);

export default Product;