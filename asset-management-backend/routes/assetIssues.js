const express = require("express");
const router = express.Router();
const multer = require("multer");
const AssetIssue = require("../models/AssetIssue");
const UsedAsset = require("../models/UsedAsset");
const path = require("path");
const Technician = require("../models/Technician");

// Setup storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/issue-images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST issue
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { assetId, issueDescription } = req.body;
    const image = req.file ? req.file.filename : "";

    const issue = new AssetIssue({ assetId, issueDescription, image });
    await issue.save();
    res.status(201).json({ message: "Issue added", issue });
  } catch (err) {
    res.status(500).json({ message: "Error adding issue", error: err.message });
  }
});

// GET all issues with asset info
router.get("/", async (req, res) => {
  try {
    const issues = await AssetIssue.find()
      .populate("assetId")
      .populate("technicianId")
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving issues", error: err.message });
  }
});
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await AssetIssue.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Issue not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});
// routes/assetIssues.js
router.patch('/:id/assign', async (req, res) => {
  try {
    const { technicianId } = req.body;
    const updated = await AssetIssue.findByIdAndUpdate(
      req.params.id,
      { technicianId },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to assign technician" });
  }
});
// PATCH /api/asset-issues/:issueId/assign-technician
router.patch("/:issueId/assign-technician", async (req, res) => {
  const { issueId } = req.params;
  const { technicianId } = req.body;

  try {
    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({ error: "Technician not found" });
    }

    const updatedIssue = await AssetIssue.findByIdAndUpdate(
      issueId,
      {
        technicianId,
        assignmentTime: new Date()
      },
      { new: true }
    ).populate("technicianId");

    res.json(updatedIssue);
  } catch (error) {
    console.error("Error assigning technician:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get detailed issue by ID
router.get("/technician-issue-details/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate("assetId technicianId");
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    res.status(200).json(issue);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;
