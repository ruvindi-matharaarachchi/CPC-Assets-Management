const express = require("express");
const router = express.Router();
const Technician = require("../models/Technician");

// ✅ Create new technician
router.post("/add", async (req, res) => {
  try {
    const newTech = new Technician(req.body);
    const savedTech = await newTech.save();
    res.status(201).json({ message: "Technician added", data: savedTech });
  } catch (err) {
    console.error("Error adding technician:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
