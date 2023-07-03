import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4();


const storeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
    required: true
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
    default: uuid,
  },
  store_name: {
    type: String,
    required: true
  },
  store_description: {
    type: String,
    required: true
  },
  store_address: {
    type: String,
    required: true
  },
  store_phoneNumber: {
    type: String,
    required: true
  },
  products: [{
    type: String,
    ref: 'Product',
  }],
});

const Store = mongoose.model("Store", storeSchema);

export default Store;