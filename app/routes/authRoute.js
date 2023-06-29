import express from "express";
import { body } from "express-validator";
import validateInput from "../middleware/inputValidation.js";
import rateLimit from "../middleware/rateLimiting.js";
import methodLimit from "../middleware/methodLimiting.js";
import authController from "../controllers/authController.js";

const router = express.Router();

// User registration
router.post(
  "/register",
  [
    body("fullname").trim().notEmpty().withMessage("Fullname is required"),
    body("email").trim().isEmail().withMessage("Please provide a valid email").notEmpty().withMessage("Email is required"),
    body("password").trim().notEmpty().withMessage("Password is required").isStrongPassword().withMessage('Password not strong...Password must contain Alphabet Case, Number & Character'),
    validateInput,
    rateLimit,
    methodLimit(['POST']),
  ],
  authController.register
);

// User Login
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Please provide a valid email").notEmpty().withMessage("Email is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    validateInput,
    rateLimit,
    methodLimit(['POST']),
  ],
  authController.login
);

export default router;
