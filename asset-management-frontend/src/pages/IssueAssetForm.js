import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import axios from "axios";
import logo from "../assets/logo.png"; // Make sure logo.png exists
import { motion } from "framer-motion";
import { FaBell, FaCog } from "react-icons/fa";

import "./IssueAssetForm.css";

const IssueAssetForm = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/asset-details/search?q=${searchQuery}`
      );
      setSearchResults(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="view-assets-container"> {/* dark background wrapper */}
      <div className="issue-asset-container">
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
              <li><a href="/asset-summary">Reports</a></li>
              <li><a href="/issue-asset">Issues</a></li>
            </ul>
          </nav>

          <div className="admin-icons">
            <FaBell className="admin-icon" />
            <FaCog className="admin-icon" />
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </motion.header>

        <h2>Issue Asset</h2>

        <div className="search-bar-section">
          <input
            type="text"
            placeholder="Search by Assigned User, Serial or Asset Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>

        {isLoading ? (
          <p style={{ color: "white" }}>Searching...</p>
        ) : (
          searchResults.length > 0 && (
            <div className="search-results">
              <h4>Matching Assets</h4>
              <table>
                <thead>
                  <tr>
                    <th>Assigned To</th>
                    <th>Location</th>
                    <th>Serial No</th>
                    <th>Asset No</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((asset) => (
                    <tr key={asset._id}>
                      <td>{asset.assignedTo}</td>
                      <td>{asset.location || "-"}</td>
                      <td>{asset.serialNumber || "-"}</td>
                      <td>{asset.assetNumber || "-"}</td>
                      <td>{asset.remarks || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default IssueAssetForm;
