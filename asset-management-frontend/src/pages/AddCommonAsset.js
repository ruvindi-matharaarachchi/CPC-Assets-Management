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
    brands: ["Dell", "HP", "Lenovo", "Asus", "Acer"],
    models: {
      Dell: ["Inspiron 15", "XPS 13", "XPS 15", "Latitude 5420", "Vostro 3510", "G15 Gaming", "Alienware m15"],
      HP: ["Pavilion x360", "Envy 13", "Spectre x360", "EliteBook 840", "ProBook 450"],
      Lenovo: ["ThinkPad X1 Carbon", "IdeaPad Flex 5", "Yoga Slim 7", "Legion 5"],
      Asus: ["Vivobook 15", "ZenBook 14", "ROG Zephyrus G14", "TUF Gaming F15"],
      Acer: ["Aspire 5", "Swift 3", "Predator Helios 300", "Nitro 5"],
    },
  },
  Printer: {
    brands: ["Canon", "Epson", "Brother", "HP"],
    models: {
      Canon: ["PIXMA G3020", "imageCLASS LBP6030w", "PIXMA TR4520"],
      Epson: ["EcoTank L3150", "L3210", "WorkForce WF-2830"],
      Brother: ["HL-L2321D", "DCP-B7500D", "MFC-L2710DW"],
      HP: ["DeskJet 2331", "LaserJet Pro MFP M126nw", "Smart Tank 515"],
    },
  },
  Monitor: {
    brands: ["Samsung", "LG", "Acer", "Dell", "BenQ"],
    models: {
      Samsung: ["Odyssey G5", "Smart Monitor M8", "Curve T55"],
      LG: ["UltraGear 27GN750", "UltraFine 5K", "27MP400"],
      Acer: ["Nitro VG270", "Predator XB273", "R240HY"],
      Dell: ["P2422H", "U2723QE", "S2721HN"],
      BenQ: ["GW2780", "PD2700U", "EX3501R"],
    },
  },
  CPU: {
    brands: ["Intel", "AMD"],
    models: {
      Intel: ["Core i3", "Core i5", "Core i7", "Core i9"],
      AMD: ["Ryzen 3", "Ryzen 5", "Ryzen 7", "Ryzen 9"],
    },
  },
  UPS: {
    brands: ["APC", "Microtek", "Luminous", "Eaton", "Vertiv"],
    models: {
      APC: ["Back-UPS BX600C-IN", "Smart-UPS 1500VA", "Easy UPS BVX"],
      Microtek: ["SEBz 1100VA", "Smart Hybrid 1450", "Digital UPS EB 900"],
      Luminous: ["EcoVolt 1050", "Zelio+ 1100", "iCruze 3000"],
      Eaton: ["5E 1100i USB", "9E 3000VA", "DX RT 5kVA"],
      Vertiv: ["Liebert ITON CX 600VA", "GXT MT+ 1kVA", "EDGE UPS 1500VA"],
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
