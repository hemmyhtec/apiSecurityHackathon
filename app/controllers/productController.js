import uploadImageToCloudinary from "../../config/cloudinary.js";
import mongoose from "mongoose";
import storeSchema from "../models/store.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import Store from "../models/store.js";

const productController = {
  addProduct: async (req, res) => {
    try {

      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const store = await Store.findOne({userId: user._id})
      if (!store) return res.status(404).json({ message: "Please create a store!" });

      const {
        product_title,
        product_description,
        product_category,
        product_price,
        product_stock,
        // product_image,
      } = req.body; 
      // const imageUrl = uploadImageToCloudinary(product_image)

      const product = new Product({
        product_title,
        product_description,
        product_category,
        product_price,
        product_stock,
        // product_image: imageUrl,
        storeId: store._id,
        userId: user._id
      });

       await product.save();

       // Update the User schema to include the new product reference
      await User.findByIdAndUpdate(user._id, { $addToSet: { products: product._id } });

      return res.status(200).json({ message: "Product saved successfully", product });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to save product to the database" });
    }
  },

  updateProduct: async(req, res) => {
    try {
      
      // authorize the user 
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });  

      const userId = user._id

      // check if the user has a store
      const store = await storeSchema.findOne({userId: userId})
      if (!store) return res.status(404).json({ message: "Please create a store!" });

      // check for a product by id 
      const product = await Product.findById(req.params.id)
      if (!product) return res.status(404).json({ message: "Please create a store!" });
      
      // Update the product details
      product.product_title = req.body.product_title;
      product.product_description = req.body.product_description;
      product.product_category = req.body.product_category;
      product.product_price = req.body.product_price;
      product.product_stock = req.body.product_stock;
      // product.product_availability = req.body.product_availability;

      // Save the updated product details to the database
      await product.save();

      // Send a success response
      res.status(200).json({ message: "Product details updated successfully" });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating product details" });
    }    
  }

  // The end of the controller 
};

export default productController;
