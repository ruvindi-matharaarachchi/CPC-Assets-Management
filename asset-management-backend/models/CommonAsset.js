const mongoose = require("mongoose");

const commonAssetSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  numberOfItems: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CommonAsset", commonAssetSchema);
