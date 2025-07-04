import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NViewUsedAssets.css";
import { FaBell, FaCog } from "react-icons/fa"; // Import Icons
import { motion } from "framer-motion"; // Animation Library
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure the logo exists

const NViewUsedAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/used-assets")
      .then((res) => {
        setAssets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch assets:", err);
        setLoading(false);
      });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddAsset = () => {
    navigate("/add-used-asset");
  };

  return (
    <div className="used-assets-container">
      {/* Header Navigation Bar */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="dashboard-header"
      >
        <img src={logo} alt="Company Logo" className="logo" />

        <nav>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/view-common-assets">View Assets List</a></li>
            <li><a href="/technicians">Technicians</a></li>
            <li><a href="/view-technicians">View Technicians</a></li>
            <li><a href="/asset-summary">Reports</a></li>
            <li><a href="/issue-asset">Issues</a></li>

          </ul>
        </nav>

        <div className="admin-icons">
          <FaBell className="admin-icon" />
          <FaCog className="admin-icon" />
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </motion.header>
      <div className="header-row">
        <h2>Used Assets List</h2>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : assets.length === 0 ? (
        <p>No assets found.</p>
      ) : (
        <table className="used-assets-table">
          <thead>
            <tr>
              <th>EPF</th>
              <th>Owner</th>
              <th>Item</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Asset Number</th>
              <th>Serial Number</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td>{asset.epf}</td>
                <td>{asset.ownerName}</td>
                <td>{asset.itemName}</td>
                <td>{asset.brand}</td>
                <td>{asset.model}</td>
                <td>{asset.assetNumber}</td>
                <td>{asset.serialNumber}</td>
                <td>{asset.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NViewUsedAssets;
