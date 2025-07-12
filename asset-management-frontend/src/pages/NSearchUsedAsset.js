import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NSearchUsedAsset.css";
import { FaBell, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const NSearchUsedAsset = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/used-assets/search?query=${encodeURIComponent(
          query
        )}`
      );
      setResults(res.data);
      setError("");
    } catch (err) {
      setError("❌ Failed to search assets.");
      setResults([]);
    }
  };

  const handleAddIssue = (assetId) => {
    navigate(`/add-asset-issue/${assetId}`);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="issue-asset-container">
      <div className="background-overlay"></div>

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
      <h2>Search Used Asset</h2>

      <div className="search-bar-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by EPF, Serial No or Asset No"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        <button
          className="view-issues-btn"
          onClick={() => navigate("/view-all-asset-issues")}
        >
          View All Issues
        </button>

      </div>

      {error && <p className="error-message">{error}</p>}

      {results.length > 0 && (
        <div className="search-results">
          <h4>Matching Assets</h4>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>EPF</th>
                <th>Serial Number</th>
                <th>Asset Number</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((asset) => (
                <tr key={asset._id}>
                  <td>{asset.itemName}</td>
                  <td>{asset.epf}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.assetNumber}</td>
                  <td>{asset.location}</td>
                  <td>
                    <button className="issue-btn" onClick={() => navigate(`/add-asset-issue/${asset._id}`)}>
                      Add Issue
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NSearchUsedAsset;
