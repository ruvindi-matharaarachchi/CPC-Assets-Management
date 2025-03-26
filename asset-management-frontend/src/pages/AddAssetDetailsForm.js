import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddAssetDetailsForm.css";

const AddAssetDetailsForm = () => {
  const { commonAssetId, quantity } = useParams();
  const navigate = useNavigate();

  const [assets, setAssets] = useState(
    Array.from({ length: Number(quantity) }, () => ({
      serialNumber: "",
      assignedTo: "",
      macAddress: "",
      ipAddress: "",
      remarks: "",
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...assets];
    updated[index][field] = value;
    setAssets(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedAssets = assets.map((asset) => ({
      ...asset,
      commonAssetId,
    }));

    try {
      await axios.post("http://localhost:5000/api/asset-details", {
        assets: formattedAssets,
      });
      alert("✅ Unique asset details added!");
      navigate("/view-common-assets");
    } catch (err) {
      alert("❌ Error: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="unique-details-form">
      <h2>Add Unique Asset Details</h2>
      <form onSubmit={handleSubmit}>
        {assets.map((asset, index) => (
          <div key={index} className="asset-detail-block">
            <h4>Asset #{index + 1}</h4>
            <input
              placeholder="Serial Number"
              value={asset.serialNumber}
              onChange={(e) => handleChange(index, "serialNumber", e.target.value)}
              required
            />
            <input
              placeholder="Assigned To"
              value={asset.assignedTo}
              onChange={(e) => handleChange(index, "assignedTo", e.target.value)}
            />
            <input
              placeholder="MAC Address"
              value={asset.macAddress}
              onChange={(e) => handleChange(index, "macAddress", e.target.value)}
            />
            <input
              placeholder="IP Address"
              value={asset.ipAddress}
              onChange={(e) => handleChange(index, "ipAddress", e.target.value)}
            />
            <input
              placeholder="Remarks"
              value={asset.remarks}
              onChange={(e) => handleChange(index, "remarks", e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit All</button>
      </form>
    </div>
  );
};

export default AddAssetDetailsForm;
