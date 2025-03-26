import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AssetSummary.css";

const AssetSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/common-assets/summary")
      .then(res => setSummary(res.data))
      .catch(err => console.error("Error fetching summary", err));
  }, []);

  return (
    <div className="summary-container">
      <h2>Asset Summary</h2>
      {summary ? (
        <div className="summary-card">
          <p><strong>Total Quantity:</strong> {summary.totalQuantity}</p>
          <p><strong>Total Asset Types:</strong> {summary.totalTypes}</p>
        </div>
      ) : (
        <p>Loading summary...</p>
      )}
    </div>
  );
};

export default AssetSummary;
