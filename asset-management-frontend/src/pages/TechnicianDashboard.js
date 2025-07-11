import React, { useEffect, useState } from "react";
import axios from "axios";

const TechnicianDashboard = () => {
  const [issues, setIssues] = useState([]);
  const technicianId = localStorage.getItem("technicianId");
  const technicianName = localStorage.getItem("technicianName");

  useEffect(() => {
    if (technicianId) {
      axios.get("http://localhost:5000/api/asset-issues")
        .then(res => {
          const filtered = res.data.filter(issue => issue.technicianId?._id === technicianId);
          setIssues(filtered);
        })
        .catch(err => console.error("Error fetching issues:", err));
    }
  }, [technicianId]);

  return (
    <div className="tech-dashboard">
      <h2>👨‍🔧 Welcome, {technicianName}</h2>
      <h3>Assigned Asset Issues</h3>

      {issues.length === 0 ? (
        <p>No assigned issues found.</p>
      ) : (
        <ul>
          {issues.map((issue) => (
            <li key={issue._id}>
              <strong>{issue.assetId?.itemName}</strong> — {issue.issueDescription}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TechnicianDashboard;
