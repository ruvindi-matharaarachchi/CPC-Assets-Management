// models/AssetIssue.js
const mongoose = require("mongoose");

const assetIssueSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsedAsset",
    required: true,
  },
  issueDescription: { type: String, required: true },
  image: { type: String },
  status: { type: String, default: "Open" },
  technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician' },
  assignmentTime: { type: Date },

}, { timestamps: true });

module.exports = mongoose.model("AssetIssue", assetIssueSchema);
