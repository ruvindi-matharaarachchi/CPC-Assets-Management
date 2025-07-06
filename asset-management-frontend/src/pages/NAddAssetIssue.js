import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NAddAssetIssue.css";

const NAddAssetIssue = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [issueDescription, setIssueDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/used-assets`)
      .then(res => {
        const found = res.data.find(item => item._id === assetId);
        if (found) setAsset(found);
      })
      .catch(() => setMessage("Failed to load asset details"));
  }, [assetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/asset-issues", {
        assetId,
        issueDescription
      });
      setMessage("✅ Issue added successfully.");
      setTimeout(() => navigate(-1), 1500);
    } catch {
      setMessage("❌ Failed to add issue.");
    }
  };

  if (!asset) return <p>Loading asset...</p>;

  return (
    <div className="issue-form-container">
      <h2>Add Issue for Asset</h2>
      {message && <div className="toast">{message}</div>}
      <div className="asset-info">
        <p><strong>EPF:</strong> {asset.epf}</p>
        <p><strong>Owner:</strong> {asset.ownerName}</p>
        <p><strong>Asset:</strong> {asset.itemName} - {asset.brand} - {asset.model}</p>
        <p><strong>Serial No:</strong> {asset.serialNumber}</p>
        <p><strong>Location:</strong> {asset.location}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          placeholder="Describe the issue..."
          required
        />
        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
};

export default NAddAssetIssue;
