import storeSchema from "../models/store.js";
import User from "../models/user.js";

const storeController = {
  addStore: async (req, res) => {
    try {

      const user = await User.findById(req.user.userId)
      if(!user) return res.status(404).json({message: "User not found"})

      const { store_name, store_description, store_address, store_phoneNumber } = req.body;

      const store = new storeSchema({
        userId: user._id,
        store_name,
        store_description,
        store_address,
        store_phoneNumber,
      });

      await store.save();
      return res.status(200).json({ message: "Congratulation! Store created succesfully" });
    } catch (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({error: "Failed to save store to the database",
        message: err.message      
      });
    }
  },
};

export default storeController;