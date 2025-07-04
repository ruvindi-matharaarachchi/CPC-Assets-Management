import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NSearchUsedAsset.css";

const NSearchUsedAsset = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/used-assets/search?query=${encodeURIComponent(
          query
        )}`
      );
      setResults(res.data);
      setError("");
    } catch (err) {
      setError("❌ Failed to search assets.");
      setResults([]);
    }
  };

  const handleAddIssue = (assetId) => {
    navigate(`/add-asset-issue/${assetId}`);
  };

  return (
    <div className="issue-asset-container">
      <h2>Search Used Asset</h2>

      <div className="search-bar-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by EPF, Serial No or Asset No"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {results.length > 0 && (
        <div className="search-results">
          <h4>Matching Assets</h4>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>EPF</th>
                <th>Serial Number</th>
                <th>Asset Number</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((asset) => (
                <tr key={asset._id}>
                  <td>{asset.itemName}</td>
                  <td>{asset.epf}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.assetNumber}</td>
                  <td>{asset.location}</td>
                  <td>
                    <button onClick={() => handleAddIssue(asset._id)} className="search-btn">
                      Add Issue
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NSearchUsedAsset;
