import express from "express";
import { body } from "express-validator";
import authenticate from "../middleware/authentication.js";
import { authorize } from "../middleware/authorization.js";
import methodLimit from "../middleware/methodLimiting.js";
import userProfile from "../controllers/userController.js";

const router = express.Router();

// Get user profile
router.get(
  "/profile",
  [authenticate,  methodLimit(["GET"])],
  userProfile.getProfile
);

// Update user profile
router.put(
  "/profile",
  [authenticate, authorize("user"), methodLimit(["PUT"])],
  userProfile.updateProfile
);

export default router;
