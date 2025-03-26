const mongoose = require("mongoose");

const assetDetailSchema = new mongoose.Schema({
  commonAssetId: { type: mongoose.Schema.Types.ObjectId, ref: "CommonAsset", required: true },
  serialNumber: { type: String, required: true },
  assignedTo: { type: String },
  macAddress: { type: String },
  ipAddress: { type: String },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AssetDetail", assetDetailSchema);
