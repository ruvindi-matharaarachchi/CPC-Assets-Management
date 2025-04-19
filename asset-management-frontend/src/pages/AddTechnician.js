import React, { useState } from "react";
import axios from "axios";
import "./AddTechnician.css";

const AddTechnician = () => {
  const [form, setForm] = useState({
    epf: "",
    fullName: "",
    username: "",
    nic: "",
    email: "",
    phone: "",
    specialization: "",
    address: "",
    experience: "",
    other: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/technicians/add", form);
      setMessage("✅ Technician added successfully.");
      setForm({
        epf: "",
        fullName: "",
        username: "",
        nic: "",
        email: "",
        phone: "",
        specialization: "",
        address: "",
        experience: "",
        other: "",
      });
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Failed to add technician.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="technician-container">
      <h2>Add Technician details</h2>

      {message && <div className="form-message">{message}</div>}

      <form className="technician-form" onSubmit={handleSubmit}>
        <input type="text" name="epf" placeholder="EPF" value={form.epf} onChange={handleChange} required />
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="text" name="nic" placeholder="NIC" value={form.nic} onChange={handleChange} required />
        <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} />

        <select name="specialization" value={form.specialization} onChange={handleChange}>
          <option value="">Select Specialization</option>
          <option value="Printer">Printer</option>
          <option value="Laptop">Laptop</option>
          <option value="Monitor">Monitor</option>
        </select>

        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />

        <select name="experience" value={form.experience} onChange={handleChange}>
          <option value="">Experience (Years)</option>
          <option value="1 Year">1 Year</option>
          <option value="2 Years">2 Years</option>
          <option value="3+ Years">3+ Years</option>
        </select>

        <textarea name="other" placeholder="Additional Information" value={form.other} onChange={handleChange}></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTechnician;
