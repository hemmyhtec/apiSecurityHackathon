import express from "express";
import storeController from "../controllers/storeController.js";

const router = express.Router();

router.post("/addStore", storeController.addStore);

export default router;