import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AddAssetDetailsForm.css"; // reuse existing CSS

const AddSingleAssetDetail = () => {
  const { commonAssetId } = useParams();
  const [quantityLeft, setQuantityLeft] = useState(0);
  const [form, setForm] = useState({
    serialNumber: "",
    assignedTo: "",
    macAddress: "",
    ipAddress: "",
    remarks: "",
  });

  // Fetch total and existing count
  useEffect(() => {
    const fetchCount = async () => {
      const [commonRes, detailRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/common-assets/${commonAssetId}`),
        axios.get(`http://localhost:5000/api/asset-details/count/${commonAssetId}`),
      ]);
      const total = commonRes.data.numberOfItems;
      const existing = detailRes.data.count;
      setQuantityLeft(total - existing);
    };
    fetchCount();
  }, [commonAssetId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/asset-details", {
        assets: [{ ...form, commonAssetId }],
      });
      alert("Asset saved!");
      setForm({ serialNumber: "", assignedTo: "", macAddress: "", ipAddress: "", remarks: "" });
      setQuantityLeft((prev) => prev - 1);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (quantityLeft <= 0) {
    return <h3 style={{ textAlign: "center" }}>✅ All assets have been added.</h3>;
  }

  return (
    <div className="unique-details-form">
      <h2>Add Asset Detail</h2>
      <p>Remaining: {quantityLeft}</p>
      <form onSubmit={handleSubmit}>
        <div className="asset-detail-block">
          <input
            name="serialNumber"
            placeholder="Serial Number"
            value={form.serialNumber}
            onChange={handleChange}
            required
          />
          <input
            name="assignedTo"
            placeholder="Assigned To"
            value={form.assignedTo}
            onChange={handleChange}
          />
          <input
            name="macAddress"
            placeholder="MAC Address"
            value={form.macAddress}
            onChange={handleChange}
          />
          <input
            name="ipAddress"
            placeholder="IP Address"
            value={form.ipAddress}
            onChange={handleChange}
          />
          <input
            name="remarks"
            placeholder="Remarks"
            value={form.remarks}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add This Asset</button>
      </form>
    </div>
  );
};

export default AddSingleAssetDetail;
