const express = require("express");
const router = express.Router();
const assetData = require("../data/assetData");

router.get("/:itemName", (req, res) => {
  const item = req.params.itemName;
  const data = assetData[item];

  if (!data) return res.status(404).json({ error: "Item not found" });

  res.json({ brands: data.brands }); // ✅ Category removed
});

module.exports = router;
