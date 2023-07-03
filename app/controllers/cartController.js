import User from "../models/user.js";

const cartController = {
  addtoCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const productId = req.params.productId;

      const { quantity } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.cart.push({ product: productId, quantity });
      await user.save();
      res.status(200).json({ message: "Product successfully added to cart", user });
    } catch (error) {
      res.status(500).json({ message: "Error while adding product to cart" });
    }
  },

  updateCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const productId = req.params.productId;

      const { quantity } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the cart item with the matching product ID
      const cartItem = user.cart.find(
        (item) => item.product.toString() === productId
      );

      if (!cartItem)
        return res.status(404).json({ message: "Cart item not found" });

      // Update the quantity of the cart item
      cartItem.quantity = quantity;
      await user.save();

      res.status(200).json({ message: "Product successfully updated", user});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating cart item quantity" });
    }
  },
  removeCart: async (req, res) => {
    try {
        const userId = req.user.userId;
      const productId = req.params.productId;

    //   const { quantity } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //Find the index of the cart item with the matching product Id
      const cartItemIndex  = user.cart.findIndex(item => item.product.toString() === productId)

      if(cartItemIndex === -1) return res.status(404).json({ message: "Cart item not found" });

      //Remove the cart item from the index
      user.cart.splice(cartItemIndex, 1);
      await user.save();

      res.json({ message: "Product removed from cart successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error removing product from cart" });
    }
  }
};

export default cartController;
