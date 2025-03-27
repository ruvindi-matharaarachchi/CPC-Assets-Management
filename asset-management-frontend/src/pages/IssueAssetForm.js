import React, { useState } from "react";
import axios from "axios";
import "./IssueAssetForm.css";

const IssueAssetForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/asset-details/search?q=${searchQuery}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="issue-asset-container">
      <h2>Issue Asset</h2>

      <div className="search-bar-section">
        <input
          type="text"
          placeholder="Search by Assigned User, Serial or Asset Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>

      {isLoading ? (
        <p>Searching...</p>
      ) : (
        searchResults.length > 0 && (
          <div className="search-results">
            <h4>Matching Assets</h4>
            <table>
              <thead>
                <tr>
                  <th>Assigned To</th>
                  <th>Location</th>
                  <th>Serial No</th>
                  <th>Asset No</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((asset) => (
                  <tr key={asset._id}>
                    <td>{asset.assignedTo}</td>
                    <td>{asset.location || "-"}</td>
                    <td>{asset.serialNumber || "-"}</td>
                    <td>{asset.assetNumber || "-"}</td>
                    <td>{asset.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default IssueAssetForm;
