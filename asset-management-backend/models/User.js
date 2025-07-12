const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "technician"], required: true },
  technicianRef: { type: mongoose.Schema.Types.ObjectId, ref: "Technician" }
});

module.exports = mongoose.model("User", userSchema);
