const express = require("express");
const router = express.Router();
const UsedAsset = require("../models/UsedAsset");

// ✅ This GET route must exist
router.get("/", async (req, res) => {
  try {
    const assets = await UsedAsset.find().sort({ createdAt: -1 });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch used assets." });
  }
});

module.exports = router;
