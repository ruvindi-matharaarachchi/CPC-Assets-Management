import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell, FaCog } from "react-icons/fa";
import "./NAddAssetDetails.css";
import logo from "../assets/logo.png";

const AddAssetDetails = () => {
  const [form, setForm] = useState({
    epf: "",
    ownerName: "",
    itemName: "",
    brand: "",
    model: "",
    assetNumber: "",
    serialNumber: "",
    location: "",
  });
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [assetOptions, setAssetOptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (form.itemName) {
      axios
        .get(`http://localhost:5000/api/asset-options/${form.itemName}`)
        .then((res) => {
          const grouped = {};
          res.data.forEach(({ brand, model }) => {
            if (!grouped[brand]) grouped[brand] = [];
            grouped[brand].push(model);
          });
          setAssetOptions({
            brands: Object.keys(grouped),
            models: grouped,
          });
        })
        .catch(() => setAssetOptions({ brands: [], models: {} }));
    }
  }, [form.itemName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "itemName") {
      setForm({ ...form, itemName: value, brand: "", model: "" });
      setCustomBrand("");
      setCustomModel("");
    } else if (name === "brand") {
      setForm({ ...form, brand: value, model: "" });
      setCustomModel("");
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      let brand = form.brand;
      let model = form.model;

      if (form.brand === "Other" && customBrand) {
        brand = customBrand;
        await axios.post("http://localhost:5000/api/asset-options", {
          itemName: form.itemName,
          brand,
          model: customModel || "Default",
        });
      }

      if (form.model === "Other" && customModel) {
        model = customModel;
        await axios.post("http://localhost:5000/api/asset-options", {
          itemName: form.itemName,
          brand,
          model,
        });
      }

      await axios.post("http://localhost:5000/api/used-assets", {
        ...form,
        brand,
        model,
      });

      setMessage({ text: "✅ Asset added successfully.", type: "success" });
      setForm({
        epf: "",
        ownerName: "",
        itemName: "",
        brand: "",
        model: "",
        assetNumber: "",
        serialNumber: "",
        location: "",
      });
      setCustomBrand("");
      setCustomModel("");
    } catch (error) {
      setMessage({ text: "❌ Failed to add asset.", type: "error" });
    }

    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const availableBrands = assetOptions.brands || [];
  const availableModels = assetOptions.models?.[form.brand] || [];

  return (
    <div className="common-asset-container">
      <motion.header className="dashboard-header">
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
        </div>
      </motion.header>

      <h2>Add Asset Details</h2>
      {message.text && <div className={`toast-message ${message.type === "success" ? "toast-success" : "toast-error"}`}>{message.text}</div>}

      <form onSubmit={handleSubmit} className="common-asset-form">
        <input name="epf" value={form.epf} onChange={handleChange} placeholder="EPF Number" required />
        <input name="ownerName" value={form.ownerName} onChange={handleChange} placeholder="Owner Name" required />

        <select name="itemName" value={form.itemName} onChange={handleChange} required>
          <option value="">Select Item</option>
          {["Laptop", "Printer", "Multifunction Printer", "FAX", "Monitor"].map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select name="brand" value={form.brand} onChange={handleChange} required>
          <option value="">Select Brand</option>
          {availableBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          <option value="Other">Other</option>
        </select>

        {form.brand === "Other" && <input placeholder="Enter New Brand" value={customBrand} onChange={(e) => setCustomBrand(e.target.value)} required />}

        <select name="model" value={form.model} onChange={handleChange} required>
          <option value="">Select Model</option>
          {availableModels.map((model) => <option key={model} value={model}>{model}</option>)}
          <option value="Other">Other</option>
        </select>

        {form.model === "Other" && <input placeholder="Enter New Model" value={customModel} onChange={(e) => setCustomModel(e.target.value)} required />}

        <input name="assetNumber" value={form.assetNumber} onChange={handleChange} placeholder="Asset Number" required />
        <input name="serialNumber" value={form.serialNumber} onChange={handleChange} placeholder="Serial Number" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />

        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
};

export default AddAssetDetails;
