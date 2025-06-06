const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

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

const assetDetailsRoutes = require("./routes/asset-details");
app.use("/api/asset-details", assetDetailsRoutes);
app.use("/api/asset-details", require("./routes/asset-details"));

const technicianRoutes = require("./routes/technicians");
app.use("/api/technicians", technicianRoutes);


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
