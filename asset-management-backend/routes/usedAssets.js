const express = require("express");
const router = express.Router();
const UsedAsset = require("../models/UsedAsset");

// @route POST /api/used-assets
router.post("/", async (req, res) => {
  const { epf, ownerName, itemName, brand, model, assetNumber, serialNumber, location } = req.body;

  if (!epf || !ownerName || !itemName || !brand || !model || !assetNumber || !serialNumber || !location) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newAsset = new UsedAsset({
      epf,
      ownerName,
      itemName,
      brand,
      model,
      assetNumber,
      serialNumber,
      location
    });

    await newAsset.save();
    res.status(200).json({ message: "✅ Asset saved successfully." });
  } catch (error) {
    console.error("Error saving asset:", error);
    res.status(500).json({ message: "❌ Server error. Could not save asset." });
  }
});

module.exports = router;
