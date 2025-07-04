const express = require("express");
const router = express.Router();
const UsedAsset = require("../models/UsedAsset");

// GET all used assets
router.get("/", async (req, res) => {
  try {
    const assets = await UsedAsset.find().sort({ createdAt: -1 });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch used assets." });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAsset = new UsedAsset(req.body);
    const savedAsset = await newAsset.save();
    res.status(201).json(savedAsset);
  } catch (err) {
    res.status(400).json({ message: "Failed to add asset", error: err.message });
  }
});
// GET /api/used-assets/search?query=...
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const assets = await UsedAsset.find({
      $or: [
        { epf: { $regex: query, $options: "i" } },
        { serialNumber: { $regex: query, $options: "i" } },
        { assetNumber: { $regex: query, $options: "i" } }
      ]
    });

    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});


module.exports = router;
