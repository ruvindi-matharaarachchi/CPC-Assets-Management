const express = require("express");
const router = express.Router();
const AssetOption = require("../models/AssetOption");

// GET all options for a given item
router.get("/:itemName", async (req, res) => {
  try {
    const { itemName } = req.params;
    const options = await AssetOption.find({ itemName });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch asset options." });
  }
});

// POST a new brand/model
router.post("/", async (req, res) => {
  const { itemName, brand, model } = req.body;

  if (!itemName || !brand || !model) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const exists = await AssetOption.findOne({ itemName, brand, model });
    if (exists) {
      return res.status(400).json({ message: "Duplicate brand/model." });
    }

    const option = new AssetOption({ itemName, brand, model });
    await option.save();
    res.status(201).json({ message: "Saved successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error while saving option." });
  }
});

module.exports = router;
