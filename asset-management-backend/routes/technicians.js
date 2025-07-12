const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Technician = require("../models/Technician");
const User = require("../models/User");

router.post("/add", async (req, res) => {
  try {
    const tech = new Technician(req.body);
    await tech.save();

    const hashedPassword = await bcrypt.hash("tech123", 10); // default password
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: "technician",
      technicianRef: tech._id
    });
    await user.save();

    res.status(201).json({ message: "Technician and user created." });
  } catch (err) {
    res.status(500).json({ message: "Error creating technician", error: err.message });
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

router.get("/:id", async (req, res) => {
  try {
    const tech = await Technician.findById(req.params.id);
    if (!tech) return res.status(404).json({ message: "Technician not found" });
    res.json(tech);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
