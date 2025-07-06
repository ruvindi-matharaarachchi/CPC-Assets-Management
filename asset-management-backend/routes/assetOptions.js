const express = require("express");
const router = express.Router();
const AssetOption = require("../models/AssetOption");

// GET /api/asset-options/:itemName
router.get("/:itemName", async (req, res) => {
  const itemName = req.params.itemName;
  try {
    const options = await AssetOption.find({ itemName });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: "Failed to load options" });
  }
});

// POST new brand/model
router.post("/", async (req, res) => {
  const { itemName, brand, model } = req.body;

  if (!itemName || !brand || !model) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await AssetOption.findOne({ itemName, brand, model });
    if (existing) {
      return res.status(400).json({ message: "Already exists." });
    }

    const newOption = new AssetOption({ itemName, brand, model });
    await newOption.save();
    res.status(201).json({ message: "Option saved successfully." });
  } catch (err) {
    console.error("Error saving option:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
