import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { jwtConfig } from "../../config/jwt.js";

const uuid = uuidv4();

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  stores: { type: String },
  products: { type: [String] },
});

//Hashing Users Password
userSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//Comparing Password
userSchema.methods.comparePassword = function (passw) {
  return bcrypt.compare(passw, this.password);
};

//Generate User Token
userSchema.methods.generateJWT = function () {
  let payload = {
    id: this._id,
    email: this.email,
    fullname: this.fullname,
  };

  return jwt.sign(payload, jwtConfig.jwtSecret, {
    expiresIn: jwtConfig.jwtExpiration,
  });
};

const User = mongoose.model("User", userSchema);
export default User;
