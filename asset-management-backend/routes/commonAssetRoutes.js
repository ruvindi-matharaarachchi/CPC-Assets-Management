const express = require("express");
const router = express.Router();
const CommonAsset = require("../models/CommonAsset");

// POST route to add a new asset
router.post("/", async (req, res) => {
  try {
    const newAsset = new CommonAsset(req.body);
    await newAsset.save();
    res.status(201).json({ message: "Asset added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// ✅ View all common assets (GET)
router.get("/", async (req, res) => {
  try {
    const assets = await CommonAsset.find().sort({ createdAt: -1 });
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
