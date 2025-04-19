const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema({
  epf: { type: String, required: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  nic: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  specialization: { type: String },
  address: { type: String },
  experience: { type: String },
  other: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Technician", technicianSchema);
