import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NAllAssetIssues.css";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"; // Ensure the logo exists

const NAllAssetIssues = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate(); // ✅ Correct place

  // Load asset issues
  useEffect(() => {
    // When coming back from assignment, re-fetch all issues
    axios.get("http://localhost:5000/api/asset-issues")
      .then(res => setIssues(res.data))
      .catch(err => console.error("Failed to load issues", err));
  }, []); // Reloads always when page opens

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
  };

  // Update status dropdown
  const handleStatusChange = async (issueId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/asset-issues/${issueId}/status`, {
        status: newStatus
      });
      setIssues(prev =>
        prev.map(issue => issue._id === issueId ? { ...issue, status: newStatus } : issue)
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="view-issues-container">
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
      <h2>All Reported Asset Issues</h2>
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>EPF</th>
              <th>Owner</th>
              <th>Asset</th>
              <th>Serial No</th>
              <th>Location</th>
              <th>Issue Description</th>
              <th>Status</th>
              <th>Date</th>
              <th>Image</th>
              <th>Technician</th> {/* New header */}
              <th>Assign</th> {/* New header */}
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.assetId?.epf}</td>
                <td>{issue.assetId?.ownerName}</td>
                <td>{issue.assetId?.itemName} - {issue.assetId?.brand} - {issue.assetId?.model}</td>
                <td>{issue.assetId?.serialNumber}</td>
                <td>{issue.assetId?.location}</td>
                <td>{issue.issueDescription}</td>

                {/* Status dropdown */}
                <td>{issue.status}</td>

                {/* Date */}
                <td>{formatDate(issue.createdAt)}</td>

                {/* Image */}
                <td>
                  {issue.image ? (
                    <img
                      src={`http://localhost:5000/uploads/issue-images/${issue.image}`}
                      alt="Issue"
                      className="issue-img"
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                    />
                  ) : "No Image"}
                </td>

                {/* Technician assigned */}
                <td>
                  {issue.technicianId
                    ? `${issue.technicianId.fullName} (${issue.technicianId.specialization})`
                    : "Not Assigned"}
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/assign-technician/${issue._id}`)}
                    className="assign-btn"
                  >
                    Assign
                  </button>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NAllAssetIssues;
