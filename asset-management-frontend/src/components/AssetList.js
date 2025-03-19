import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Animation Library
import Header from "../components/Header"; // Import Header
import "./AddAsset.css"; // Import CSS

const AddAsset = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState({
        itemName: "",
        model: "",
        serialNumber: "",
        category: "",
        location: "",
        purchaseDate: "",
        warrantyStatus: "",
        assignedTo: "",
        condition: "",
        price: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setAsset({ ...asset, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await axios.post("http://localhost:5000/api/assets", asset);
            setMessage("✅ Asset added successfully!");
            setTimeout(() => navigate("/assets"), 2000); // Redirect to Asset List
        } catch (error) {
            setMessage("❌ Error adding asset. Please try again.");
        }
    };

    return (
        <div className="add-asset-container">
            {/* Include Header */}
            <Header />

            {/* Background Overlay */}
            <div className="background-overlay"></div>

            <motion.h2 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="title"
            >
                Add New Asset
            </motion.h2>

            {message && <p className="message">{message}</p>}

            <motion.form 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit} 
                className="add-asset-form"
            >
                <input type="text" name="itemName" placeholder="Item Name" value={asset.itemName} onChange={handleChange} required />
                <input type="text" name="model" placeholder="Model" value={asset.model} onChange={handleChange} required />
                <input type="text" name="serialNumber" placeholder="Serial Number" value={asset.serialNumber} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category (e.g., Laptop, Monitor, Printer)" value={asset.category} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={asset.location} onChange={handleChange} required />
                <input type="date" name="purchaseDate" value={asset.purchaseDate} onChange={handleChange} required />
                
                <select name="warrantyStatus" value={asset.warrantyStatus} onChange={handleChange} required>
                    <option value="">Select Warranty Status</option>
                    <option value="Under Warranty">Under Warranty</option>
                    <option value="Expired">Expired</option>
                </select>

                <input type="text" name="assignedTo" placeholder="Assigned To (Employee Name)" value={asset.assignedTo} onChange={handleChange} />
                
                <select name="condition" value={asset.condition} onChange={handleChange} required>
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Needs Repair">Needs Repair</option>
                    <option value="Broken">Broken</option>
                </select>

                <input type="number" name="price" placeholder="Price (in USD)" value={asset.price} onChange={handleChange} required />

                <button type="submit" className="submit-button">➕ Add Asset</button>
            </motion.form>

            {/* View Assets Button */}
            <motion.button 
                whileHover={{ scale: 1.1 }} 
                className="view-assets-button" 
                onClick={() => navigate("/assets")}
            >
                📋 View Assets List
            </motion.button>
        </div>
    );
};

export default AddAsset;
