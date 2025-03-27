const express = require('express');
const router = express.Router();
const AssetDetail = require('../models/AssetDetail'); // adjust path as needed

router.get('/search', async (req, res) => {
  const query = req.query.q?.toLowerCase();

  try {
    const results = await AssetDetail.find({
      $or: [
        { assignedTo: { $regex: query, $options: 'i' } },
        { serialNumber: { $regex: query, $options: 'i' } },
        { assetNumber: { $regex: query, $options: 'i' } },
      ]
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error searching assets");
  }
});

module.exports = router;
