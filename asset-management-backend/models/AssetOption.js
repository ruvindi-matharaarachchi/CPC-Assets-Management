const mongoose = require("mongoose");

const AssetOptionSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true }
}, { timestamps: true });

AssetOptionSchema.index({ itemName: 1, brand: 1, model: 1 }, { unique: true });

module.exports = mongoose.model("AssetOption", AssetOptionSchema);
