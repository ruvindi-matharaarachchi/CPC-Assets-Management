import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AssetList.css";

const AssetList = () => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/assets")
            .then(response => setAssets(response.data))
            .catch(error => console.error("Error fetching assets:", error));
    }, []);

    return (
        <div className="asset-list-container">
            <h2>Asset List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Model</th>
                        <th>Serial Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map(asset => (
                        <tr key={asset._id}>
                            <td>{asset.itemName}</td>
                            <td>{asset.model}</td>
                            <td>{asset.serialNumber}</td>
                            <td>
                                {/* View Button (Redirects to View Asset Page) */}
                                <Link to={`/assets/${asset._id}`} className="view-button">🔍 View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetList;
