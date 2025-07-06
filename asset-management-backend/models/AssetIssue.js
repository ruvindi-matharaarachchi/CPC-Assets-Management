const mongoose = require("mongoose");

const AssetIssueSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsedAsset",
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Open", // Default status
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("AssetIssue", AssetIssueSchema);
