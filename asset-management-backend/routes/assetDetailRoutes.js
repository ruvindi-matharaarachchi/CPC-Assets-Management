const express = require("express");
const router = express.Router();
const AssetDetail = require("../models/AssetDetail");

// ✅ POST multiple asset details
router.post("/", async (req, res) => {
  try {
    const assets = req.body.assets;
    await AssetDetail.insertMany(assets);
    res.status(201).json({ message: "Assets saved successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/count/:commonAssetId", async (req, res) => {
  const count = await AssetDetail.countDocuments({ commonAssetId: req.params.commonAssetId });
  res.json({ count });
});

// ✅ GET: Count asset details for a commonAssetId
router.get("/count/:commonAssetId", async (req, res) => {
  try {
    const count = await AssetDetail.countDocuments({ commonAssetId: req.params.commonAssetId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/by-common/:commonAssetId", async (req, res) => {
  try {
    const assets = await AssetDetail.find({ commonAssetId: req.params.commonAssetId });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
