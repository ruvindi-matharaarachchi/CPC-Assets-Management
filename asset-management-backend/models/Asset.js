const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema({
    itemName: String,
    model: String,
    serialNumber: String,
    category: String,
    location: String,
    purchaseDate: String,
    warrantyStatus: String,
    assignedTo: String,
    condition: String,
    price: Number,
});

module.exports = mongoose.model("Asset", AssetSchema);
