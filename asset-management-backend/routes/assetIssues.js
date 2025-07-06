const express = require("express");
const router = express.Router();
const AssetIssue = require("../models/AssetIssue");

router.post("/", async (req, res) => {
  try {
    const newIssue = new AssetIssue(req.body);
    const saved = await newIssue.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to add issue", error: err.message });
  }
});

module.exports = router;
