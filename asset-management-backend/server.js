const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const assetRouter = require("./routes/assetRouter"); // Import the asset routes

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));  // User Authentication Routes
app.use("/api/assets", require("./routes/assetRoutes")); // Asset Management Routes
app.use("/api/common-assets", require("./routes/commonAssetRoutes"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
// Use asset routes
app.use("/api/common-assets", assetRouter);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
