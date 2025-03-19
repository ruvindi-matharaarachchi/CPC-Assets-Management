import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewAsset.css"; // Import CSS file

const ViewAsset = () => {
    const { id } = useParams(); // Get asset ID from URL
    const navigate = useNavigate();
    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch asset details by ID
        axios.get(`http://localhost:5000/api/assets/${id}`)
            .then(response => {
                setAsset(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching asset:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!asset) {
        return <div className="error">Asset not found.</div>;
    }

    return (
        <div className="view-asset-container">
            <h2>Asset Details</h2>

            <div className="asset-details">
                <p><strong>Item Name:</strong> {asset.itemName}</p>
                <p><strong>Model:</strong> {asset.model}</p>
                <p><strong>Serial Number:</strong> {asset.serialNumber}</p>
                <p><strong>Category:</strong> {asset.category}</p>
                <p><strong>Location:</strong> {asset.location}</p>
                <p><strong>Purchase Date:</strong> {new Date(asset.purchaseDate).toLocaleDateString()}</p>
                <p><strong>Warranty Status:</strong> {asset.warrantyStatus}</p>
                <p><strong>Assigned To:</strong> {asset.assignedTo || "Not Assigned"}</p>
                <p><strong>Condition:</strong> {asset.condition}</p>
                <p><strong>Price:</strong> ${asset.price}</p>
            </div>

            <button className="back-button" onClick={() => navigate("/assets")}>⬅ Back to Assets</button>
        </div>
    );
};

export default ViewAsset;
