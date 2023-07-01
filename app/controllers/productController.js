import Product from "../models/product.js";

const productController = {
  addProduct: async (req, res) => {
    try {
      const { title, description, price, image } = req.body;

      const product = new Product({
        title,
        description,
        price,
        image
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