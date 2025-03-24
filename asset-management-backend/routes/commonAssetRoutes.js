const express = require("express");
const router = express.Router();
const CommonAsset = require("../models/CommonAsset"); // Make sure path is correct

router.post("/", async (req, res) => {
  try {
    const asset = new CommonAsset(req.body);
    await asset.save();
    res.status(201).json({ message: "Asset added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
