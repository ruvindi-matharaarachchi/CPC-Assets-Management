import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell, FaCog } from "react-icons/fa";
import "./AddCommonAsset.css";
import logo from "../assets/logo.png";

const assetOptions = {
  Laptop: {
    brands: ["Dell", "HP", "Lenovo"],
    models: ["Inspiron", "Pavilion", "ThinkPad"],
  },
  Printer: {
    brands: ["Canon", "Epson", "Brother"],
    models: ["LBP2900", "EcoTank", "HL-L2321D"],
  },
  Monitor: {
    brands: ["Samsung", "LG", "Acer"],
    models: ["Odyssey", "UltraWide", "Nitro"],
  },
};

const AddCommonAsset = () => {
  const [form, setForm] = useState({
    itemName: "",
    brand: "",
    model: "",
    location: "",
    numberOfItems: "",
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
        model: "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      await axios.post("http://localhost:5000/api/common-assets", form);
      setMessage({ text: "✅ Asset added successfully.", type: "success" });
      setForm({
        itemName: "",
        brand: "",
        model: "",
        location: "",
        numberOfItems: "",
      });
    } catch (error) {
      setMessage({ text: "❌ Failed to add asset.", type: "error" });
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  const availableBrands = assetOptions[form.itemName]?.brands || [];
  const availableModels = assetOptions[form.itemName]?.models || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddAsset = () => {
    navigate("/add-asset");
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
            <li><a href="/add-asset-form">Asset ListNew</a></li>
            <li><a href="/technicians">Technicians</a></li>
            <li><a href="/reports">Reports</a></li>
          </ul>
        </nav>

        <div className="admin-icons">
          <FaBell className="admin-icon" />
          <FaCog className="admin-icon" />
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </motion.header>

      <h2>Add Common Asset</h2>

      {/* ✅ Toast Message */}
      {message.text && (
        <div className={`toast-message ${message.type === "success" ? "toast-success" : "toast-error"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="common-asset-form">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name (e.g., Laptop)"
          value={form.itemName}
          onChange={handleChange}
          required
        />

        <select name="brand" value={form.brand} onChange={handleChange} required>
          <option value="">Select Brand</option>
          {availableBrands.length > 0
            ? availableBrands.map((b) => <option key={b} value={b}>{b}</option>)
            : <option disabled>Enter Item Name First</option>}
        </select>

        <select name="model" value={form.model} onChange={handleChange} required>
          <option value="">Select Model</option>
          {availableModels.length > 0
            ? availableModels.map((m) => <option key={m} value={m}>{m}</option>)
            : <option disabled>Enter Item Name First</option>}
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="numberOfItems"
          placeholder="Number of Items"
          value={form.numberOfItems}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
};

export default AddCommonAsset;
