import mongoose from "mongoose";
import  User  from "./user.js";
import { v4 as uuidv4 } from "uuid";

const storeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  userId: {
    type: String,
    ref: User,
    required: true,
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
  }
});

const Store = mongoose.model("Store", storeSchema);

export default Store;