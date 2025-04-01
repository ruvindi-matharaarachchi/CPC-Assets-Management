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

  const validateSerialNumber = async () => {
    const newErrors = {};
    const regexSerialNumber = /^[a-zA-Z0-9-]{5,15}$/; // Alphanumeric and 5-15 characters
    
    // Check if serial number is valid format
    if (!regexSerialNumber.test(form.serialNumber)) {
      newErrors.serialNumber = "Serial Number must be alphanumeric and between 5 and 15 characters.";
    } else {
      try {
        // Check if serial number exists in the backend (uniqueness check)
        const response = await axios.get(`http://localhost:5000/api/asset-details/search?q=${form.serialNumber}`);
        if (response.data.length > 0) {
          newErrors.serialNumber = "Serial Number already exists. Please provide a unique one.";
        }
      } catch (err) {
        console.error("Error checking serial number uniqueness", err);
        newErrors.serialNumber = "Error checking serial number uniqueness.";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    setIsSubmitting(true); // Indicate submission has started

    // Validate serial number
    const newErrors = await validateSerialNumber();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
      setIsSubmitting(false); // Stop submission process
      return; // Exit early if validation fails
    }

    try {
      // Send data to the backend if validation is successful
      await axios.post("http://localhost:5000/api/asset-details", {
        assets: [{ ...form, commonAssetId }],
      });
      alert("Asset saved!");
      setForm({ assignedTo: "", location: "", serialNumber: "", assetNumber: "", remarks: "" }); // Reset form after successful submission
      setQuantityLeft((prev) => prev - 1); // Decrease the quantity left
      setErrors({}); // Reset error state after successful submission
    } catch (err) {
      alert("Error: " + err.message); // Handle submission error
    }
    setIsSubmitting(false); // End submission process
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
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <input
              name="serialNumber"
              placeholder="Serial Number"
              value={form.serialNumber}
              onChange={handleChange}
              required
            />
            {errors.serialNumber && <p className="error">{errors.serialNumber}</p>} {/* Show validation errors */}
          </div>
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
        <button type="submit" disabled={isSubmitting || quantityLeft <= 0}>
          {isSubmitting ? "Saving..." : "Add This Asset"}
        </button>
      </form>
    </div>
  );
};

export default AddSingleAssetDetail;
