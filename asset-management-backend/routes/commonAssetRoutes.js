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




module.exports = router;
