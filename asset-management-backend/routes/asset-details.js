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

module.exports = router;
