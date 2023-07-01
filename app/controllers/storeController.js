import storeSchema from "../models/store.js";

const storeController = {
  addStore: async (req, res) => {
    try {
      const { userId, name, description, address, phoneNumber } = req.body;

      const store = new storeSchema({
        userId,
        name,
        description,
        address,
        phoneNumber,
      });

      await store.save();
      return res.status(200).json({ message: "Store saved successfully" });
    } catch (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({error: "Failed to save store to the database",
        msg: err.message      
      });
    }
  },
};

export default storeController;