const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

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

const usedAssetsRoute = require("./routes/usedAssets"); 
app.use("/api/used-assets", usedAssetsRoute);    
       
const usedAssetsRoutes = require("./routes/usedAssets");
app.use("/api/used-assets", usedAssetsRoutes);

const assetOptionsRoute = require("./routes/assetOptions");
app.use("/api/asset-options", assetOptionsRoute);

const assetIssueRoutes = require("./routes/assetIssues");
app.use("/api/asset-issues", assetIssueRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads")); // for image access
app.use("/api/asset-issues", require("./routes/assetIssues"));


app.get("/", (req, res) => {
  res.send("Used Asset Management API Running...");
});
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
