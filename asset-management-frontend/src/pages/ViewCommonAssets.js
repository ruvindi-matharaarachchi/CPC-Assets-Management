import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewCommonAssets.css";

const ViewCommonAssets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/common-assets");
        setAssets(response.data);
      } catch (err) {
        console.error("Failed to fetch assets", err);
      }
    };
    fetchAssets();
  }, []);

  return (
    <div className="view-assets-container">
      <h2>Common Asset Records</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Location</th>
            <th>Quantity</th>
            <th>Added On</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset._id}>
              <td>{asset.itemName}</td>
              <td>{asset.brand}</td>
              <td>{asset.model}</td>
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
