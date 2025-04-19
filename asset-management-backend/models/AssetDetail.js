const mongoose = require("mongoose");

const assetDetailSchema = new mongoose.Schema({
  commonAssetId: { type: mongoose.Schema.Types.ObjectId, ref: "CommonAsset", required: true },
  location: { type: String, required: true },
  serialNumber: { type: String, required: true },
  assetNumber: { type: String },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
  
  // ✅ New Fields
  assignedUser: {
    username: String,
    empId: String,
  }
});

module.exports = mongoose.model("AssetDetail", assetDetailSchema);
