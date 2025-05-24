import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddTechnician.css";
import { motion } from "framer-motion";
import { FaBell, FaCog } from "react-icons/fa";
import logo from "../assets/logo.png";

const AddTechnician = () => {
  const navigate = useNavigate(); // ✅ Added for logout
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="view-assets-container">
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
            <li><a href="/technicians">Technicians</a></li>
            <li><a href="/view-technicians">View Technicians</a></li>
            <li><a href="/asset-summary">Reports</a></li>
            <li><a href="/issue-asset">Issues</a></li>
          </ul>
        </nav>
        <div className="admin-icons">
          <FaBell className="admin-icon" />
          <FaCog className="admin-icon" />
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </motion.header>

      <div className="technician-container">
        <h2>Add Technician Details</h2>

        {message && <div className="form-message">{message}</div>}

        <form className="technician-form" onSubmit={handleSubmit}>
          <input type="text" name="epf" placeholder="EPF" value={form.epf} onChange={handleChange} required />
          <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input type="text" name="nic" placeholder="NIC" value={form.nic} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />

          <select name="specialization" value={form.specialization} onChange={handleChange} required>
            <option value="">Select Specialization</option>
            <option value="Printer">Printer</option>
            <option value="Laptop">Laptop</option>
            <option value="Monitor">Monitor</option>
          </select>

          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />

          <select name="experience" value={form.experience} onChange={handleChange} required>
            <option value="">Experience (Years)</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3+ Years">3+ Years</option>
          </select>

          <textarea name="other" placeholder="Additional Information" value={form.other} onChange={handleChange}></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTechnician;
