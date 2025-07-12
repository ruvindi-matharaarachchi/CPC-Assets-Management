import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TechnicianDashboard.css";

const TechnicianDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId"); // ✅ Use userId for password update
  const technicianId = localStorage.getItem("technicianId"); // still needed for issue filtering
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

  const handleChangePassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/change-password", {
        userId, // ✅ Use userId instead of technicianId
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
    <div className="dashboard-container">
      <h2>👨‍🔧 Welcome, {username}</h2>
      <h3>Assigned Asset Issues</h3>

      {issues.length === 0 ? (
        <p>No assigned issues.</p>
      ) : (
        <div className="dashboard-content">
          {issues.map((issue) => (
            <div className="dashboard-card" key={issue._id}>
              <h3>{issue.assetId?.itemName}</h3>
              <p>{issue.issueDescription}</p>
              <p>Status: {issue.status}</p>
            </div>
          ))}
        </div>
      )}

      <button className="add-asset-button" onClick={() => setShowForm(true)}>
        Change Password
      </button>

      {showForm && (
        <div className="change-password-form">
          <h4>Change Password</h4>
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

      {message && <p>{message}</p>}
    </div>
  );
};

export default TechnicianDashboard;
