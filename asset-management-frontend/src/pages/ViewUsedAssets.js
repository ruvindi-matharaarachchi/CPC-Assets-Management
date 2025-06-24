import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ViewUsedAssets.css";

const ViewUsedAssets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/used-assets");
                setAssets(response.data);
            } catch (error) {
                console.error("Error fetching used assets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    return (
        <div className="used-assets-container">
            <h2>Used Asset List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : assets.length === 0 ? (
                <p>No assets found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>EPF</th>
                            <th>Owner Name</th>
                            <th>Item</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Asset No.</th>
                            <th>Serial No.</th>
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

export default ViewUsedAssets;
