import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./AddCommonAsset.css"; // Ensure you have the relevant CSS file for styles

const AddCommonAssetList = () => {
  const [assets, setAssets] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState(null);

  // Fetch assets and dashboard data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of assets
        const assetResponse = await axios.get("http://localhost:5000/api/common-assets");
        setAssets(assetResponse.data);

        // Fetch the dashboard data
        const dashboardResponse = await axios.get("http://localhost:5000/api/dashboard");
        setDashboardInfo(dashboardResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="asset-list-container">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="dashboard-header"
      >
        <h2>Asset List</h2>
      </motion.header>

      {/* Dashboard Information */}
      {dashboardInfo && (
        <div className="dashboard-info">
          <p><strong>Total Assets: </strong>{dashboardInfo.totalAssets}</p>
          <p><strong>Pending Issues: </strong>{dashboardInfo.pendingIssues}</p>
          <p><strong>Technicians Available: </strong>{dashboardInfo.techniciansAvailable}</p>
          <p><strong>Reports Generated: </strong>{dashboardInfo.reportsGenerated}</p>
        </div>
      )}

      {/* Display list of assets */}
      <table className="asset-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Location</th>
            <th>Number of Items</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? (
            assets.map((asset) => (
              <tr key={asset._id}>
                <td>{asset.itemName}</td>
                <td>{asset.brand}</td>
                <td>{asset.model}</td>
                <td>{asset.location}</td>
                <td>{asset.numberOfItems}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No assets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddCommonAssetList;
