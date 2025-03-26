import React, { useState } from "react";
import axios from "axios";
import "./AddCommonAsset.css";

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

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset brand and model if itemName changes
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
    setMessage("");
    try {
      await axios.post("http://localhost:5000/api/common-assets", form);
      setMessage("✅ Asset added successfully.");
      setForm({
        itemName: "",
        brand: "",
        model: "",
        location: "",
        numberOfItems: "",
      });
    } catch (error) {
      setMessage("❌ Failed to add asset.");
    }
  };

  // Dynamically load brand/model options based on typed item name
  const availableBrands = assetOptions[form.itemName]?.brands || [];
  const availableModels = assetOptions[form.itemName]?.models || [];

  return (
    <div className="common-asset-container">
      <h2>Add Common Asset</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="common-asset-form">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name (e.g., Laptop)"
          value={form.itemName}
          onChange={handleChange}
          required
        />

        <select
          name="brand"
          value={form.brand}
          onChange={handleChange}
          required
        >
          <option value="">Select Brand</option>
          {availableBrands.length > 0
            ? availableBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))
            : <option disabled>Enter Item Name First</option>}
        </select>

        <select
          name="model"
          value={form.model}
          onChange={handleChange}
          required
        >
          <option value="">Select Model</option>
          {availableModels.length > 0
            ? availableModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))
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
