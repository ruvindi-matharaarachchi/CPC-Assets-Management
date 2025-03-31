import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AddAssetDetailsForm.css"; // reuse existing CSS

const AddSingleAssetDetail = () => {
  const { commonAssetId } = useParams();
  const [quantityLeft, setQuantityLeft] = useState(0);
  const [form, setForm] = useState({
    assignedTo: "",
    location: "",
    serialNumber: "",
    assetNumber: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  // Validation logic
  const validateForm = async () => {
    const newErrors = {};
    const regexSerialNumber = /^[a-zA-Z0-9-]{5,15}$/; // Simple regex for serial number (adjust as necessary)
    const regexAssetNumber = /^[a-zA-Z0-9-]{5,15}$/; // Simple regex for asset number (adjust as necessary)

    // Required field checks
    if (!form.assignedTo) newErrors.assignedTo = "Assigned To is required.";
    if (!form.location) newErrors.location = "Location is required.";
    if (!form.serialNumber) newErrors.serialNumber = "Serial Number is required.";
    else if (!regexSerialNumber.test(form.serialNumber))
      newErrors.serialNumber = "Serial Number must be alphanumeric and between 5 and 15 characters.";
    else {
      // Check if serial number already exists
      const response = await axios.get(`http://localhost:5000/api/asset-details/serial-number/${form.serialNumber}`);
      if (response.data.exists) {
        newErrors.serialNumber = "Serial Number already exists. Please provide a unique one.";
      }
    }

    if (!form.assetNumber) newErrors.assetNumber = "Asset Number is required.";
    else if (!regexAssetNumber.test(form.assetNumber))
      newErrors.assetNumber = "Asset Number must be alphanumeric and between 5 and 15 characters.";
    else {
      // Check if asset number already exists
      const response = await axios.get(`http://localhost:5000/api/asset-details/asset-number/${form.assetNumber}`);
      if (response.data.exists) {
        newErrors.assetNumber = "Asset Number already exists. Please provide a unique one.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form before submission
    if (await validateForm()) {
      try {
        await axios.post("http://localhost:5000/api/asset-details", {
          assets: [{ ...form, commonAssetId }],
        });
        alert("Asset saved!");
        setForm({ assignedTo: "", location: "", serialNumber: "", assetNumber: "", remarks: "" });
        setQuantityLeft((prev) => prev - 1);
      } catch (err) {
        alert("Error: " + err.message);
      }
    } else {
      setIsSubmitting(false);
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
            name="assignedTo"
            placeholder="Assigned To"
            value={form.assignedTo}
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Function"
            value={form.location}
            onChange={handleChange}
            required
          />
          <input
            name="serialNumber"
            placeholder="Serial Number"
            value={form.serialNumber}
            onChange={handleChange}
            required
          />
          <input
            name="assetNumber"
            placeholder="Asset Number"
            value={form.assetNumber}
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
