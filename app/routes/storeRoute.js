import express from "express";
import storeController from "../controllers/storeController.js";
import authenticate from "../middleware/authentication.js";
import rateLimiter from "../middleware/rateLimiting.js";
import methodLimiter from "../middleware/methodLimiting.js";
import { body } from "express-validator";
import validateInput from "../middleware/inputValidation.js";

const router = express.Router();

router.post(
  "/add_store",
  [
    body("store_name").trim().notEmpty().withMessage("Store name is required"),
    body("store_description")
      .trim()
      .notEmpty()
      .withMessage("Store description name is required"),
    body("store_address")
      .trim()
      .notEmpty()
      .withMessage("Store address is required"),
    body("store_phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Store phone number is required"),
    validateInput,
    authenticate,
    rateLimiter,
    methodLimiter(["POST"]),
  ],
  storeController.addStore
);
router.put(
  "/update_store",
  [
    body("store_name").trim().notEmpty().withMessage("Store name is required"),
    body("store_description")
      .trim()
      .notEmpty()
      .withMessage("Store description name is required"),
    body("store_address")
      .trim()
      .notEmpty()
      .withMessage("Store address is required"),
    body("store_phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Store phone number is required"),
    validateInput,
    authenticate,
    rateLimiter,
    methodLimiter(["PUT"]),
  ],
  storeController.updateStore
);

router.delete(
  "/delete_store",
  authenticate,
  rateLimiter,
  methodLimiter(["DELETE"]),
  storeController.deleteStore
);

router.get(
  "/get_store",
  authenticate,
  rateLimiter,
  methodLimiter(["GET"]),
  storeController.getStore
);

export default router;
