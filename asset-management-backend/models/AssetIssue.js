const mongoose = require("mongoose");

const AssetIssueSchema = new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: "UsedAsset", required: true },
  issueDescription: { type: String, required: true },
  reportedDate: { type: Date, default: Date.now },
  status: { type: String, default: "Open" }
}, { timestamps: true });

module.exports = mongoose.model("AssetIssue", AssetIssueSchema);
