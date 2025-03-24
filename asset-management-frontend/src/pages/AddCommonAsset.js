import React, { useState } from "react";
import axios from "axios";
import "./AddCommonAsset.css";

const AddCommonAsset = () => {
  const [form, setForm] = useState({
    itemName: "",
    brand: "",
    category: "",
    location: "",
    numberOfItems: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        category: "",
        location: "",
        numberOfItems: "",
      });
    } catch (error) {
      setMessage("❌ Failed to add asset.");
    }
  };

  return (
    <div className="common-asset-container">
      <h2>Add Common Asset</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="common-asset-form">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={form.itemName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
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
