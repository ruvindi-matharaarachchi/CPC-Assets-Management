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
// GET all technicians
router.get("/", async (req, res) => {
    try {
      const techs = await Technician.find().sort({ createdAt: -1 });
      res.json(techs);
    } catch (err) {
      console.error("Error fetching technicians:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
