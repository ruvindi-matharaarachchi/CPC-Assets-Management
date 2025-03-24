import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAssetForm = () => {
  const [itemName, setItemName] = useState("");
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // Fetch brands when itemName changes
  useEffect(() => {
    if (!itemName.trim()) return;

    axios.get(`http://localhost:5000/api/options/${itemName}`)
      .then((res) => {
        setBrandOptions(Object.keys(res.data.brands));
        setModelOptions([]);
        setSelectedBrand("");
        setSelectedModel("");
      })
      .catch(() => {
        setBrandOptions([]);
        setModelOptions([]);
      });
  }, [itemName]);

  // Fetch models when brand changes
  useEffect(() => {
    if (selectedBrand && itemName) {
      axios.get(`http://localhost:5000/api/options/${itemName}`)
        .then((res) => {
          setModelOptions(res.data.brands[selectedBrand]);
        });
    }
  }, [selectedBrand]);

  return (
    <div className="asset-form">
      <h2>Add Asset</h2>

      <input
        type="text"
        placeholder="Item Name (e.g., Laptop)"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="">Select Brand</option>
        {brandOptions.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>

      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
        <option value="">Select Model</option>
        {modelOptions.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
    </div>
  );
};

export default AddAssetForm;
