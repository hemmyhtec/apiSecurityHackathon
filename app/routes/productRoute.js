import express from "express";
import productController from "../controllers/productController.js";
import { body } from "express-validator";
import { authorization } from "../middleware/authorization.js";
import validateInput from "../middleware/inputValidation.js";
import rateLimiter from "../middleware/rateLimiting.js";
import methodLimiter from "../middleware/methodLimiting.js";
import authenticate from "../middleware/authentication.js";

const router = express.Router();
// Add product route
router.post("/add_product", [
    body("product_title").trim().notEmpty().withMessage("Product title is required"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Product description name is required"),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Product category is required"),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Product price is required"),
    body("product_stock")
      .trim()
      .notEmpty()
      .withMessage("Product stock is required"),
    validateInput,
    authenticate,
    rateLimiter,
    methodLimiter(["POST"]),
  ], productController.addProduct);

// Update Route
router.put("/update_product/:id", [
  body("product_title").trim().notEmpty().withMessage("Product title is required"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Product description name is required"),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Product category is required"),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Product price is required"),
    body("product_stock")
      .trim()
      .notEmpty()
      .withMessage("Product stock is required"),
    validateInput,
    authenticate,
    rateLimiter,
    methodLimiter(["PUT"]),
], productController.updateProduct)


export default router;