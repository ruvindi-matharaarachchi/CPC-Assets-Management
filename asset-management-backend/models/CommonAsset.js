const mongoose = require("mongoose");

const commonAssetSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  numberOfItems: { type: Number, required: true },
  addedBy: { type: String }, // Optionally store admin's name or ID
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CommonAsset", commonAssetSchema);
