import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const storeSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4
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

const Store = model("store", storeSchema);

export default Store;