import storeSchema from "../models/store.js";

const storeController = {
  addStore: async (req, res) => {
    try {
      const { name, description, address, phoneNumber } = req.body;

      const store = new storeSchema({
        name,
        description,
        address,
        phoneNumber,
      });

      await store.save();
      return res.status(200).json({ message: "Data saved successfully" });
    } catch (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({ error: "Failed to save data to the database" });
    }
  },
};

export default storeController;