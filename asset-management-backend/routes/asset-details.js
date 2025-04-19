const express = require('express');
const router = express.Router();
const AssetDetail = require('../models/AssetDetail'); // Adjust this path

// Search route
router.get('/search', async (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) return res.status(400).json({ message: "Query required" });

  try {
    const results = await AssetDetail.find({
      $or: [
        { assignedTo: { $regex: query, $options: "i" } },
        { serialNumber: { $regex: query, $options: "i" } },
        { assetNumber: { $regex: query, $options: "i" } },
      ]
    });
    res.json(results);
  } catch (err) {
    console.error("Search Error", err);
    res.status(500).send("Server error");
  }
});


// ✅ Assign user to a unique asset
router.post("/assign-user/:id", async (req, res) => {
  try {
    const { username, empId } = req.body;

    if (!username || !empId) {
      return res.status(400).json({ message: "Username and Employee ID are required" });
    }

    const updated = await AssetDetail.findByIdAndUpdate(
      req.params.id,
      { assignedUser: { username, empId } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json({ message: "User assigned successfully", data: updated });
  } catch (err) {
    console.error("Error assigning user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
