import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell, FaCog } from "react-icons/fa";
import "./NAddAssetDetails.css";
import logo from "../assets/logo.png";

const assetOptions = {
    Laptop: {
        brands: ["Dell", "HP", "Lenovo", "Asus", "Acer"], models: {
            Dell: ["Inspiron 15", "XPS 13", "XPS 15"],
            HP: ["Pavilion x360", "Envy 13"],
            Lenovo: ["ThinkPad X1", "Yoga Slim 7"],
            Asus: ["Vivobook 15", "ZenBook 14"],
            Acer: ["Aspire 5", "Swift 3"]
        }
    },
    Printer: {
        brands: ["Canon", "Epson", "HP"], models: {
            Canon: ["PIXMA G3020", "TR4520"],
            Epson: ["L3210", "WF-2830"],
            HP: ["LaserJet M126nw", "Smart Tank 515"]
        }
    },
    "Multifunction Printer": {
        brands: ["HP", "Brother", "Canon"], models: {
            HP: ["Smart Tank Plus", "LaserJet MFP 178nw"],
            Brother: ["MFC-T4500DW", "DCP-L2540DW"],
            Canon: ["PIXMA G7070", "imageCLASS MF244dw"]
        }
    },
    FAX: {
        brands: ["Brother", "Panasonic"], models: {
            Brother: ["FAX-2840", "FAX-878"],
            Panasonic: ["KX-FT981", "KX-FP701"]
        }
    },
    Monitor: {
        brands: ["Samsung", "LG"], models: {
            Samsung: ["Odyssey G5", "Smart Monitor M8"],
            LG: ["UltraGear 27GN750", "27MP400"]
        }
    },
};

const AddAssetDetails = () => {
    const [form, setForm] = useState({
        epf: "",
        ownerName: "",
        itemName: "",
        brand: "",
        model: "",
        assetNumber: "",
        serialNumber: "",
        location: ""
    });

    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "itemName") {
            setForm({
                ...form,
                itemName: value,
                brand: "",
                model: ""
            });
        } else if (name === "brand") {
            setForm({
                ...form,
                brand: value,
                model: ""
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        try {
            await axios.post("http://localhost:5000/api/used-assets", form);
            setMessage({ text: "✅ Asset added successfully.", type: "success" });
            setForm({
                epf: "",
                ownerName: "",
                itemName: "",
                brand: "",
                model: "",
                assetNumber: "",
                serialNumber: "",
                location: ""
            });
        } catch (error) {
            setMessage({ text: "❌ Failed to add asset.", type: "error" });
        }

        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    };

    const availableBrands = assetOptions[form.itemName]?.brands || [];
    const availableModels = assetOptions[form.itemName]?.models?.[form.brand] || [];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="common-asset-container">
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="dashboard-header"
            >
                <img src={logo} alt="Company Logo" className="logo" />
                <nav>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/view-common-assets">View Assets List</a></li>
                        <li><a href="/asset-summary">Reports</a></li>
                    </ul>
                </nav>
                <div className="admin-icons">
                    <FaBell className="admin-icon" />
                    <FaCog className="admin-icon" />
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </motion.header>

            <h2>Add Asset Details</h2>

            {message.text && (
                <div className={`toast-message ${message.type === "success" ? "toast-success" : "toast-error"}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="common-asset-form">
                <input name="epf" value={form.epf} onChange={handleChange} type="text" placeholder="EPF Number" required />
                <input name="ownerName" value={form.ownerName} onChange={handleChange} type="text" placeholder="Owner Name" required />
                <select name="itemName" value={form.itemName} onChange={handleChange} required>
                    <option value="">Select Item</option>
                    {Object.keys(assetOptions).map(key => <option key={key} value={key}>{key}</option>)}
                </select>
                <select name="brand" value={form.brand} onChange={handleChange} required>
                    <option value="">Select Brand</option>
                    {availableBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>
                <select name="model" value={form.model} onChange={handleChange} required>
                    <option value="">Select Model</option>
                    {availableModels.map(model => <option key={model} value={model}>{model}</option>)}
                </select>
                <input name="assetNumber" value={form.assetNumber} onChange={handleChange} type="text" placeholder="Asset Number" required />
                <input name="serialNumber" value={form.serialNumber} onChange={handleChange} type="text" placeholder="Serial Number" required />
                <input name="location" value={form.location} onChange={handleChange} type="text" placeholder="Location" required />
                <button type="submit">Add Asset</button>
            </form>
        </div>
    );
};

export default AddAssetDetails;
