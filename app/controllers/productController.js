import uploadImageToCloudinary from "../../config/cloudinary.js";
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
      return res.status(200).json({ message: "Product saved successfully" });
    } catch (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({ error: "Failed to save product to the database" });
    }
  },
};

export default productController;
