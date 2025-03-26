const express = require("express");
const router = express.Router();
const CommonAsset = require("../models/CommonAsset");

// ✅ Add new asset
router.post("/", async (req, res) => {
  try {
    const newAsset = new CommonAsset(req.body);
    await newAsset.save();
    res.status(201).json({ message: "Asset added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ✅ GET: View all common assets
router.get("/", async (req, res) => {
  try {
    const assets = await CommonAsset.find().sort({ createdAt: -1 });
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
