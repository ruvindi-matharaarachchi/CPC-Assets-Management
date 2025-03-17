const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");

// Create a new asset
router.post("/", async (req, res) => {
    try {
        const newAsset = new Asset(req.body);
        await newAsset.save();
        res.status(201).json({ message: "Asset added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding asset", error });
    }
});

// Get all assets
router.get("/", async (req, res) => {
    try {
        const assets = await Asset.find();
        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assets", error });
    }
});

module.exports = router;
