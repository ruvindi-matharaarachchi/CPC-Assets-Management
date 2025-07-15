import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCog } from "react-icons/fa"; // Icons for header
import logo from "../assets/logo.png"; // Ensure the path is correct
import "./TechnicianDashboard.css";

const TechnicianDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");
  const technicianId = localStorage.getItem("technicianId");
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/asset-issues")
      .then((res) => {
        const assigned = res.data.filter(
          (issue) => issue.technicianId?._id === technicianId
        );
        setIssues(assigned);
      })
      .catch((err) => {
        console.error("Failed to fetch issues:", err.message);
      });
  }, [technicianId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const total = issues.length;
  const openCount = issues.filter(issue => issue.status === "Open").length;
  const inProgressCount = issues.filter(issue => issue.status === "In Progress").length;
  const resolvedCount = issues.filter(issue => issue.status === "Resolved").length;

  const handleChangePassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/change-password", {
        userId,
        currentPassword,
        newPassword,
      });
      setMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setShowForm(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="dashboard-container1">
      {/* Header */}
      <header className="dashboard-header">
        <img src={logo} alt="Company Logo" className="logo" />
        <nav>
          <ul>
            <li><a href="/technician-dashboard">Dashboard</a></li>
            <li><a href="#" onClick={() => setShowForm(true)}>Reset Password</a></li>
          </ul>
        </nav>
        <div className="admin-icons">
          <FaBell className="admin-icon" />
          <FaCog className="admin-icon" />
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      {/* Welcome Message */}
      <h2>Welcome, {username}</h2>

      <div className="issue-summary-container">
        <div className="issue-summary-card open">
          <h4>Open</h4>
          <p>{openCount}</p>
        </div>
        <div className="issue-summary-card in-progress">
          <h4>In Progress</h4>
          <p>{inProgressCount}</p>
        </div>
        <div className="issue-summary-card resolved">
          <h4>Resolved</h4>
          <p>{resolvedCount}</p>
        </div>
        <div className="issue-summary-card total">
          <h4>Total</h4>
          <p>{total}</p>
        </div>
      </div>



      {/* Issue Cards */}
      {issues.length === 0 ? (
        <p>No assigned issues.</p>
      ) : (
        <div className="dashboard-content">
          {issues.map((issue) => (
            <div
              className="dashboard-card"
              key={issue._id}
              onClick={() => navigate(`/technician-issue-details/${issue._id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3>{issue.assetId?.itemName}</h3>
              <p>Issue: {issue.issueDescription}</p>
              <p>Status: {issue.status}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reset Password Form */}
      {showForm && (
        <div className="change-password-form">
          <h4>Reset Password</h4>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="add-asset-button-group">
            <button className="add-asset-button" onClick={handleChangePassword}>
              Submit
            </button>
            <button
              className="add-asset-button secondary-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Feedback Message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default TechnicianDashboard;
