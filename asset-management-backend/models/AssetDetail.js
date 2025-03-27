const mongoose = require("mongoose");

const assetDetailSchema = new mongoose.Schema({
  commonAssetId: { type: mongoose.Schema.Types.ObjectId, ref: "CommonAsset", required: true },
  serialNumber: { type: String, required: true },
  assignedTo: { type: String },
  location: { type: String, required: true },
  assetNumber: { type: String },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AssetDetail", assetDetailSchema);
