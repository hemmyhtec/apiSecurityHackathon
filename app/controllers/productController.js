import uploadImageToCloudinary from "../../config/cloudinary.js";
import Product from "../models/product.js";

const productController = {
  addProduct: async (req, res) => {
    try {

      const {
        product_title,
        product_description,
        product_category,
        product_price,
        product_stock,
        product_image,
      } = req.body;

      console.log(product_title, product_description)
      const imageUrl = uploadImageToCloudinary(product_image)

      const product = new Product({
        product_title,
        product_description,
        product_category,
        product_price,
        product_stock,
        product_image: imageUrl
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
