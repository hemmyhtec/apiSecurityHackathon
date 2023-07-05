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
      await User.findByIdAndUpdate(user._id, { $push: { products: product._id } });
      await Store.findByIdAndUpdate(store._id, { $push: { products: product._id } });

      return res.status(200).json({ message: "Product saved successfully", product });
    } catch (err) {
      console.log(err.message)
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
  },

  // Get all product 
  getAllUserProduct: async (req, res) => {

    try {
      // authorize the user 
     const user = await User.findById(req.user.userId);
     if (!user) return res.status(404).json({ message: "User not found" });  

     const userId = user._id


     // check if the user has a store
     const store = await storeSchema.findOne({userId: userId})
     if (!store) return res.status(404).json({ message: "Please create a store!" });

 
     const products = await Product.find({userId: userId})

     res.status(200).json({ products });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating product details" });
    }
  
  },

  // Delete product controller
  deleteProduct: async(req, res) => {
    try {
      // find the user
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const userId = user._id
      // check if the user has a store
      const store = await storeSchema.findOne({userId: userId})
      if (!store) return res.status(404).json({ message: "Please create a store!" });

      // find and delete product by Id
      const { id } = req.params;
      const product = await Product.findOneAndDelete({ _id: id, storeId: store._id });

      if (!product) return res.status(404).json({ message: "Product not found" });

      res.status(200).json({ message: "Product deleted successfully" });       

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating product details" });      
    }   
  }, 

  // Search Product Controller
  SearchProduct: async(req, res) => {
      try {
        const { search } = req.body;        
        
        // Find products that match the search query
        const products = await Product.find(
          { $text: { $search: search } },
          { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });

        if (products.length === 0) {
          return res.status(404).json({ message: 'No products found' });
        }
    
        res.status(200).json({ products });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching products" });
      }
  }

  // END OF CONTROLLER
};

export default productController;
