const mongoose = require("mongoose");

const UsedAssetSchema = new mongoose.Schema({
  epf: String,
  ownerName: String,
  itemName: String,
  brand: String,
  model: String,
  assetNumber: String,
  serialNumber: String,
  location: String,
}, { timestamps: true });

module.exports = mongoose.model("UsedAsset", UsedAssetSchema);
