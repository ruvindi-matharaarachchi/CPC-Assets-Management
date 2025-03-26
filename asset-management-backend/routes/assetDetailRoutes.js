const express = require("express");
const router = express.Router();
const AssetDetail = require("../models/AssetDetail");

// POST multiple device details
router.post("/", async (req, res) => {
  try {
    const assets = req.body.assets;
    await AssetDetail.insertMany(assets);
    res.status(201).json({ message: "Assets saved successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
