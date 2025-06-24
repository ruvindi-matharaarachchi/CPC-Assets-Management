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

  const [message, setMessage] = useState({ text: "", type: "" });
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [assetOptions, setAssetOptions] = useState({});
  const navigate = useNavigate();

  // 🔁 Load brands and models from backend when item is selected
  useEffect(() => {
    if (form.itemName) {
      axios
        .get(`http://localhost:5000/api/asset-options/${form.itemName}`)
        .then((res) => {
          const brandMap = {};
          res.data.forEach((opt) => {
            if (!brandMap[opt.brand]) brandMap[opt.brand] = [];
            brandMap[opt.brand].push(opt.model);
          });

          const brandList = Object.keys(brandMap);
          setAssetOptions({
            [form.itemName]: {
              brands: brandList,
              models: brandMap,
            },
          });
        })
        .catch((err) => console.error("Failed to load options:", err));
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
    } else if (name === "model") {
      setForm({ ...form, model: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    let updatedForm = { ...form };

    try {
      // ➕ Add custom brand if needed
      if (form.brand === "Other" && customBrand) {
        updatedForm.brand = customBrand;

        await axios.post("http://localhost:5000/api/asset-options", {
          itemName: form.itemName,
          brand: customBrand,
          model: customModel || "Default",
        });
      }

      // ➕ Add custom model if needed
      if (form.model === "Other" && customModel) {
        updatedForm.model = customModel;

        await axios.post("http://localhost:5000/api/asset-options", {
          itemName: form.itemName,
          brand: updatedForm.brand,
          model: customModel,
        });
      }

      // ✅ Submit asset details
      await axios.post("http://localhost:5000/api/used-assets", updatedForm);
      setMessage({ text: "✅ Asset added successfully.", type: "success" });

      // 🔁 Reset form
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
      if (error.response?.status === 400) {
        setMessage({ text: "⚠️ Duplicate brand or model exists.", type: "error" });
      } else {
        setMessage({ text: "❌ Failed to add asset.", type: "error" });
      }
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
          {["Laptop", "Printer", "Multifunction Printer", "FAX", "Monitor"].map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select name="brand" value={form.brand} onChange={handleChange} required>
          <option value="">Select Brand</option>
          {availableBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
          <option value="Other">Other</option>
        </select>

        {form.brand === "Other" && (
          <input
            type="text"
            placeholder="Enter new brand"
            value={customBrand}
            onChange={(e) => setCustomBrand(e.target.value)}
            required
          />
        )}

        <select name="model" value={form.model} onChange={handleChange} required>
          <option value="">Select Model</option>
          {availableModels.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
          <option value="Other">Other</option>
        </select>

        {form.model === "Other" && (
          <input
            type="text"
            placeholder="Enter new model"
            value={customModel}
            onChange={(e) => setCustomModel(e.target.value)}
            required
          />
        )}

        <input name="assetNumber" value={form.assetNumber} onChange={handleChange} type="text" placeholder="Asset Number" required />
        <input name="serialNumber" value={form.serialNumber} onChange={handleChange} type="text" placeholder="Serial Number" required />
        <input name="location" value={form.location} onChange={handleChange} type="text" placeholder="Location" required />

        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
};

export default AddAssetDetails;
