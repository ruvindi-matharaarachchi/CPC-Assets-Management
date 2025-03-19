import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddAsset.css"; // Import new CSS file

const AddAsset = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState({
        itemName: "",
        brand: "",
        model: "",
        serialNumber: "",
        category: "",
        location: "",
        assetNumber: "",
        purchaseDate: "",
        warrantyStatus: "",
        assignedTo: "",
        condition: "",
        price: "",
        other: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setAsset({ ...asset, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axios.post("http://localhost:5000/api/assets", asset);
            setMessage("✅ Asset added successfully!");
            setTimeout(() => navigate("/assets"), 2000);
        } catch (error) {
            setMessage("❌ Error adding asset. Please try again.");
        }
    };

    return (
        <div className="add-asset-container">
            {/* Header */}
            <h2 className="form-title">Add Asset</h2>

            {/* Success/Error Message */}
            {message && <p className="message">{message}</p>}

            {/* Asset Form */}
            <form onSubmit={handleSubmit} className="add-asset-form">
                <div className="form-column">
                    <label>Asset Number</label>
                    <input type="text" name="assetNumber" placeholder="Enter Asset Number" value={asset.assetNumber} onChange={handleChange} required />

                    <label>Item Name</label>
                    <input type="text" name="itemName" placeholder="Enter Item Name" value={asset.itemName} onChange={handleChange} required />

                    <label>Location</label>
                    <input type="text" name="location" placeholder="Enter Location" value={asset.location} onChange={handleChange} required />

                    <label>Model</label>
                    <input type="text" name="model" placeholder="Enter Model" value={asset.model} onChange={handleChange} required />

                    <label>Category</label>
                    <select name="category" value={asset.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Printer">Printer</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Other</label>
                    <input type="text" name="other" placeholder="Additional Details" value={asset.other} onChange={handleChange} />
                </div>

                <div className="form-column">
                    <label>Brand</label>
                    <input type="text" name="brand" placeholder="Enter Brand" value={asset.brand} onChange={handleChange} required />

                    <label>Serial Number</label>
                    <input type="text" name="serialNumber" placeholder="Enter Serial Number" value={asset.serialNumber} onChange={handleChange} required />

                    <label>Purchase Date</label>
                    <input type="date" name="purchaseDate" value={asset.purchaseDate} onChange={handleChange} required />

                    <label>Warranty Status</label>
                    <select name="warrantyStatus" value={asset.warrantyStatus} onChange={handleChange} required>
                        <option value="">Select Warranty Status</option>
                        <option value="Under Warranty">Under Warranty</option>
                        <option value="Expired">Expired</option>
                    </select>

                    <label>Condition</label>
                    <select name="condition" value={asset.condition} onChange={handleChange} required>
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Needs Repair">Needs Repair</option>
                        <option value="Broken">Broken</option>
                    </select>

                    <label>Price</label>
                    <input type="number" name="price" placeholder="Enter Price" value={asset.price} onChange={handleChange} required />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default AddAsset;
