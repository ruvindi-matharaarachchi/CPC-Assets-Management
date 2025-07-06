import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NAllAssetIssues.css";

const NAllAssetIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/asset-issues")
      .then(res => setIssues(res.data))
      .catch(err => console.error("Failed to load issues", err));
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
  };
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
      <h2>All Reported Asset Issues</h2>
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
              <th>Status</th> {/* New column */}
              <th>Date</th>   {/* New column */}
              <th>Image</th>
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
                <td>
                  <select
                    value={issue.status}
                    onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>

                <td>{formatDate(issue.createdAt)}</td> {/* Format date */}
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

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NAllAssetIssues;
