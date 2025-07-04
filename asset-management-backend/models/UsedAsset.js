const mongoose = require("mongoose");

const UsedAssetSchema = new mongoose.Schema({
  epf: { type: String, required: true },
  ownerName: { type: String, required: true },
  itemName: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  assetNumber: { type: String, required: true, unique: true },  // ⚠️ Possible Issue
  serialNumber: { type: String, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("UsedAsset", UsedAssetSchema);
