// routes/dashboard.js
const express = require("express");
const router = express.Router();

const CommonAsset = require("../models/CommonAsset");
const AssetIssue = require("../models/AssetIssue");
const Technician = require("../models/Technician");

router.get("/", async (req, res) => {
  try {
    const totalAssets = await CommonAsset.countDocuments();
    const pendingIssues = await AssetIssue.countDocuments({ status: "Open" });
    const techniciansAvailable = await Technician.countDocuments({ status: "available" });

    res.json({
      totalAssets,
      pendingIssues,
      techniciansAvailable,
      reportsGenerated: 0, // update if needed
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
