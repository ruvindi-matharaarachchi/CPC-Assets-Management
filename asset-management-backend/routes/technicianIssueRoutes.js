const express = require("express");
const router = express.Router();
const Issue = require("../models/AssetIssue"); // use the correct model file name
const Technician = require("../models/Technician");
// Route to get detailed issue info for technician
router.get("/technician-issue-details/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("assetId")
      .populate("technicianId");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json(issue);
  } catch (err) {
    console.error("Error fetching technician issue:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;
