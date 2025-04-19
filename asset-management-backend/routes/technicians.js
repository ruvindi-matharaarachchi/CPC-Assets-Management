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
    res.status(500).json({ message: "Server error" });
  }
});
// UPDATE technician
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Technician.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Technician not found" });
    res.json({ message: "Technician updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// DELETE technician
router.delete("/delete/:id", async (req, res) => {
  try {
    const removed = await Technician.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Technician not found" });
    res.json({ message: "Technician deleted", data: removed });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});


module.exports = router;
