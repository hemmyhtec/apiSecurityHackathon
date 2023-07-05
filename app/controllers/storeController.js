import storeSchema from "../models/store.js";
import User from "../models/user.js";

const storeController = {
  addStore: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const {
        store_name,
        store_description,
        store_address,
        store_phoneNumber,
      } = req.body;

      const store = new storeSchema({
        userId: user._id,
        store_name,
        store_description,
        store_address,
        store_phoneNumber,
      });

      await store.save();

    // Update the User schema to include the new store reference
    await User.findByIdAndUpdate(user._id, { $push: { stores: store._id } });
    return res
        .status(200)
        .json({ message: "Congratulation! Store created succesfully" });
    } catch (err) {
      return res
        .status(500)
        .json({
          error: "Error occur while creating store",
          message: err.message,
        });
    }
  },
  updateStore: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const store = await storeSchema.findOne({userId: user._id})
      if (!store) return res.status(404).json({ message: "Please create a store!" });

      store.store_name = req.body.store_name
      store.store_description = req.body.store_description
      store.store_address = req.body.store_address
      store.store_phoneNumber = req.body.store_phoneNumber

      const newStore = await store.save()

      await User.findByIdAndUpdate(user._id, { $push: { stores: newStore._id } });
      return res.status(200).json({ message: "Store updated successfully", store: newStore });

    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Error occur while updating store",
          message: error.message,
        });
    }
  },
  deleteStore: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const store = await storeSchema.findOneAndDelete({ userId: user._id });
      if (!store) return res.status(404).json({ message: "Store not found" });
  
      return res.status(200).json({ message: "Store deleted successfully" });
    } catch (error) {
      return res.status(500).json({
        error: "Error occurred while deleting store",
        message: error.message,
      });
    }
  },
  getStore: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const store = await storeSchema.findOne({ userId: user._id }).populate('products');
      if (!store) return res.status(404).json({ message: "Store not found" });
      return res.status(200).json({ store });
    } catch (error) {
      return res.status(500).json({
        error: "Error occurred while retrieving store",
        message: error.message,
      });
    }
  },
    
};

export default storeController;
