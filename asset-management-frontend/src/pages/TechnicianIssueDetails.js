import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TechnicianDashboard.css";

const TechnicianIssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/technician-issue-details/${id}`)
      .then(res => {
        setIssue(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch issue details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading issue details...</p>;
  if (!issue) return <p>Issue not found.</p>;

  return (
    <div className="dashboard-container">
      <h2>Issue Details</h2>
      <div className="dashboard-card">
        <h3>{issue.assetId?.itemName}</h3>
        <p><strong>Description:</strong> {issue.issueDescription}</p>
        <p><strong>Status:</strong> {issue.status}</p>
        <p><strong>Reported Date:</strong> {new Date(issue.createdAt).toLocaleDateString()}</p>
        <p><strong>Assigned Technician:</strong> {issue.technicianId?.name || "N/A"}</p>
      </div>
    </div>
  );
};

export default TechnicianIssueDetails;
