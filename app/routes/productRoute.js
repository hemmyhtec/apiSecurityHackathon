import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.post("/addProduct", productController.addProduct);

export default router;