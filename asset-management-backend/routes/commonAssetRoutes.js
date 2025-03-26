const express = require("express");
const router = express.Router();
const CommonAsset = require("../models/CommonAsset");

router.post("/", async (req, res) => {
  try {
    const newAsset = new CommonAsset(req.body);
    await newAsset.save();
    res.status(201).json({ message: "Asset added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get the total number of items from the commonassets collection
router.get('/api/dashboard', async (req, res) => {
    try {
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

        // Send back the response
        res.json({
            totalAssets: totalNumberOfItems,  // You can add more data as needed
            pendingIssues: 15,                // Placeholder data, adjust as needed
            techniciansAvailable: 8,          // Placeholder data, adjust as needed
            reportsGenerated: 25              // Placeholder data, adjust as needed
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Error fetching data" });
    }
});


module.exports = router;
