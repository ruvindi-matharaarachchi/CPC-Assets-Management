import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AssetDetailView.css"; // You can create this later

const ViewAssetDetails = () => {
  const { id } = useParams(); // commonAssetId
  const navigate = useNavigate();
  const [commonAsset, setCommonAsset] = useState(null);
  const [uniqueAssets, setUniqueAssets] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [commonRes, detailRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/common-assets/${id}`),
          axios.get(`http://localhost:5000/api/asset-details/by-common/${id}`)
        ]);

        setCommonAsset(commonRes.data);
        setUniqueAssets(detailRes.data);
      } catch (err) {
        console.error("Failed to fetch asset details", err);
      }
    };

    fetchDetails();
  }, [id]);

  if (!commonAsset) return <p>Loading...</p>;

  return (
    <div className="asset-details-container">
      <h2>Asset: {commonAsset.itemName}</h2>
      <p><strong>Brand:</strong> {commonAsset.brand}</p>
      <p><strong>Model:</strong> {commonAsset.model}</p>
      <p><strong>Location:</strong> {commonAsset.location}</p>
      <p><strong>Total Quantity:</strong> {commonAsset.numberOfItems}</p>

      <h3>Unique Devices:</h3>
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Assigned To</th>
            <th>MAC</th>
            <th>IP</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {uniqueAssets.map((a) => (
            <tr key={a._id}>
              <td>{a.serialNumber}</td>
              <td>{a.assignedTo || "-"}</td>
              <td>{a.macAddress || "-"}</td>
              <td>{a.ipAddress || "-"}</td>
              <td>{a.remarks || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
};

export default ViewAssetDetails;
