import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell, FaCog } from "react-icons/fa";
import "./AddCommonAsset.css";
import logo from "../assets/logo.png";

// ✅ Updated assetOptions with models under each brand
const assetOptions = {
  Laptop: {
    brands: ["Dell", "HP", "Lenovo"],
    models: {
      Dell: ["Inspiron"],
      HP: ["Pavilion"],
      Lenovo: ["ThinkPad"],
    },
  },
  Printer: {
    brands: ["Canon", "Epson", "Brother"],
    models: {
      Canon: ["LBP2900"],
      Epson: ["EcoTank"],
      Brother: ["HL-L2321D"],
    },
  },
  Monitor: {
    brands: ["Samsung", "LG", "Acer"],
    models: {
      Samsung: ["Odyssey"],
      LG: ["UltraWide"],
      Acer: ["Nitro"],
    },
  },
  CPU: {
    brands: ["Intel", "AMD", "Ryzen"],
    models: {
      Intel: ["Core i5", "Core i7"],
      AMD: ["Ryzen 5"],
      Ryzen: ["Ryzen 7"],
    },
  },
  UPS: {
    brands: ["APC", "Microtek", "Luminous"],
    models: {
      APC: ["Back-UPS 600VA"],
      Microtek: ["SEBz 1100VA"],
      Luminous: ["EcoVolt"],
    },
  },
};

const AddCommonAsset = () => {
  const [form, setForm] = useState({
    itemName: "",
    brand: "",
    model: "",
    numberOfItems: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemName") {
      setForm({
        itemName: value,
        brand: "",
        model: "",
        numberOfItems: form.numberOfItems,
      });
    } else if (name === "brand") {
      setForm({
        ...form,
        brand: value,
        model: "", // Reset model when brand changes
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
        numberOfItems: "",
      });
    } catch (error) {
      setMessage({ text: "❌ Failed to add asset.", type: "error" });
    }

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
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
            <li><a href="/add-asset-form">Asset ListNew</a></li>
            <li><a href="/technicians">Technicians</a></li>
            <li><a href="/asset-summary">Reports</a></li>
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
        <select
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
          required
        >
          <option value="">Select Item</option>
          {Object.keys(assetOptions).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        <select
          name="brand"
          value={form.brand}
          onChange={handleChange}
          required
        >
          <option value="">Select Brand</option>
          {availableBrands.length > 0
            ? availableBrands.map((b) => <option key={b} value={b}>{b}</option>)
            : <option disabled>Select Item First</option>}
        </select>

        <select
          name="model"
          value={form.model}
          onChange={handleChange}
          required
        >
          <option value="">Select Model</option>
          {availableModels.length > 0
            ? availableModels.map((m) => <option key={m} value={m}>{m}</option>)
            : <option disabled>Select Brand First</option>}
        </select>

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
