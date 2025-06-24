const express = require("express");
const router = express.Router();
const AssetOption = require("../models/AssetOption");

// GET /api/asset-options/:itemName
router.get("/:itemName", async (req, res) => {
  const { itemName } = req.params;
  try {
    const options = await AssetOption.find({ itemName });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: "Failed to load asset options." });
  }
});

// POST /api/asset-options
router.post("/", async (req, res) => {
  const { itemName, brand, model } = req.body;
  try {
    const existing = await AssetOption.findOne({ itemName, brand, model });
    if (existing) {
      return res.status(400).json({ message: "Duplicate brand or model for this item." });
    }

    const option = new AssetOption({ itemName, brand, model });
    await option.save();
    res.status(201).json({ message: "Option added successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error while saving option." });
  }
});

module.exports = router;
