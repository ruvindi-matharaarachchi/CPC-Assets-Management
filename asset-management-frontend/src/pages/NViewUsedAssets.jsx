import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NViewUsedAssets.css";

const NViewUsedAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/used-assets")
      .then((res) => {
        setAssets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch assets:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="used-assets-container">
      <h2>Used Assets List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : assets.length === 0 ? (
        <p>No assets found.</p>
      ) : (
        <table className="used-assets-table">
          <thead>
            <tr>
              <th>EPF</th>
              <th>Owner</th>
              <th>Item</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Asset Number</th>
              <th>Serial Number</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td>{asset.epf}</td>
                <td>{asset.ownerName}</td>
                <td>{asset.itemName}</td>
                <td>{asset.brand}</td>
                <td>{asset.model}</td>
                <td>{asset.assetNumber}</td>
                <td>{asset.serialNumber}</td>
                <td>{asset.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NViewUsedAssets;
