import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddAssetDetails.css";

const AddAssetDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { commonAssetId, quantity } = location.state;

  const [assets, setAssets] = useState(
    Array.from({ length: quantity }, () => ({
      serialNumber: "",
      assignedTo: "",
      macAddress: "",
      ipAddress: "",
      remarks: "",
      commonAssetId,
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...assets];
    updated[index][field] = value;
    setAssets(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/asset-details", { assets });
      alert("✅ All assets added!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save asset details.");
    }
  };

  return (
    <div className="details-container">
      <h2>Enter Asset Details for {quantity} Items</h2>
      <form onSubmit={handleSubmit} className="details-form">
        {assets.map((asset, index) => (
          <div className="device-box" key={index}>
            <h4>Asset {index + 1}</h4>
            <input
              type="text"
              placeholder="Serial Number"
              value={asset.serialNumber}
              onChange={(e) => handleChange(index, "serialNumber", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Assigned To"
              value={asset.assignedTo}
              onChange={(e) => handleChange(index, "assignedTo", e.target.value)}
            />
            <input
              type="text"
              placeholder="MAC Address"
              value={asset.macAddress}
              onChange={(e) => handleChange(index, "macAddress", e.target.value)}
            />
            <input
              type="text"
              placeholder="IP Address"
              value={asset.ipAddress}
              onChange={(e) => handleChange(index, "ipAddress", e.target.value)}
            />
            <textarea
              placeholder="Remarks"
              value={asset.remarks}
              onChange={(e) => handleChange(index, "remarks", e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="submit-button">➕ Save All</button>
      </form>
    </div>
  );
};

export default AddAssetDetails;
