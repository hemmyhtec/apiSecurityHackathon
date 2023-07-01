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
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const Store = mongoose.model("store", storeSchema);

export default Store;