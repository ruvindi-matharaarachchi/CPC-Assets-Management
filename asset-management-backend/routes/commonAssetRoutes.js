const express = require("express");
const router = express.Router();
const CommonAsset = require("../models/CommonAsset");

// POST route to add a new asset
router.post("/", async (req, res) => {
  try {
    const newAsset = new CommonAsset(req.body);
    await newAsset.save();
    res.status(201).json({ message: "Asset added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET route for dashboard to get total number of items and other info
router.get('/api/dashboard', async (req, res) => {
    try {
        // Aggregate to sum the number of items in the collection
        const totalAssets = await CommonAsset.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$numberOfItems" } // Summing up the numberOfItems field
                }
            }
        ]);

        // If no data exists, return 0
        const totalNumberOfItems = totalAssets.length > 0 ? totalAssets[0].total : 0;

        // Send back the response with additional placeholder data
        res.json({
            totalAssets: totalNumberOfItems,  // Total number of assets added
            pendingIssues: 15,                // Placeholder for pending issues count
            techniciansAvailable: 8,          // Placeholder for available technicians
            reportsGenerated: 25              // Placeholder for generated reports count
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Error fetching data" });
    }
});

// GET: Get all common assets
router.get("/", async (req, res) => {
  try {
    const assets = await CommonAsset.find().sort({ createdAt: -1 });
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
