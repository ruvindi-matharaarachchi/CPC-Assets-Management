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

module.exports = router;
