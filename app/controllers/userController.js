import User from "../models/user.js";
import Store from "../models/store.js";
import Product from "../models/product.js";

//Get user Profile
const userProfile = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user.userId;

      const user = await User.findById(userId).select("-password").exec();

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error retrieving user profile" });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { email } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { email },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error updating user profile" });
    }
  },
};

export default userProfile;
