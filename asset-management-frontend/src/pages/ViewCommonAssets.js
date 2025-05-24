import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell, FaCog } from "react-icons/fa"; import "./ViewCommonAssets.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const ViewCommonAssets = () => {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/common-assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error("Failed to fetch assets", err));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEdit = (id, quantity) => {
    navigate(`/add-one-asset/${id}`);
  };

  return (
    <div className="view-assets-container">
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
      <h2>All Common Assets</h2>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Added Date</th>
            <th>Actions</th> {/* New Column */}
            <th>View</th> {/* New Column */}

          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset._id}>
              <td>{asset.itemName}</td>
              <td>{asset.brand || "-"}</td>
              <td>{asset.model || "-"}</td>
              <td>{asset.numberOfItems}</td>
              <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="add-unique-button"
                  onClick={() => handleEdit(asset._id, asset.numberOfItems)}
                >
                  Add Unique Details
                </button>
              </td>
              <td>
                <button
                  className="view-details-button"
                  onClick={() => navigate(`/view-asset/${asset._id}`)}
                >
                  View Details
                </button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCommonAssets;
