import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewCommonAssets.css";

const ViewCommonAssets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/common-assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error("Failed to fetch assets", err));
  }, []);

  return (
    <div className="view-assets-container">
      <h2>All Common Assets</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Location</th>
            <th>Quantity</th>
            <th>Added Date</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset._id}>
              <td>{asset.itemName}</td>
              <td>{asset.brand || "-"}</td>
              <td>{asset.model || "-"}</td>
              <td>{asset.location}</td>
              <td>{asset.numberOfItems}</td>
              <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCommonAssets;
