import express from "express";
import { body } from "express-validator";
import authenticate from "../middleware/authentication.js";
import { authorize } from "../middleware/authorization.js";
import rateLimit from "../middleware/rateLimiting.js";
import methodLimit from "../middleware/methodLimiting.js";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.post(
  "/add_cart/:productId",
  [
    body("quantity")
      .trim()
      .notEmpty()
      .withMessage("Quantity is required"),
    authenticate,
    rateLimit,
    methodLimit(["POST"]),
  ],
  cartController.addtoCart
);
router.put(
    "/update_cart/:productId",
    [
      body("quantity")
        .trim()
        .notEmpty()
        .withMessage("Quantity is required"),
      authenticate,
      rateLimit,
      methodLimit(["PUT"]),
    ],
    cartController.updateCart
  );
  router.delete(
    "/remove_cart/:productId",
    [
      body("quantity")
        .trim()
        .notEmpty()
        .withMessage("Quantity is required"),
      authenticate,
      rateLimit,
      methodLimit(["DELETE"]),
    ],
    cartController.removeCart
  );
export default router;
