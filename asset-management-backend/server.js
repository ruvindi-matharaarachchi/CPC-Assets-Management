const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const assetDetailsRoutes = require('./routes/asset-details');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes")); // User login
app.use("/api/common-assets", require("./routes/commonAssetRoutes"));
app.use("/api/asset-details", require("./routes/assetDetailRoutes"));
app.use('/api/asset-details', assetDetailsRoutes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
