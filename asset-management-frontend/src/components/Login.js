import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { motion } from "framer-motion"; // Animation Library
import "./Login.css"; // Import CSS

const Login = () => {
  const [selectedUser, setSelectedUser] = useState("admin"); // Default role
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(selectedUser, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Background Image */}
      <div className="background-overlay"></div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="title"
      >
        <h1>CPC Head Office</h1>
      </motion.div>

      {/* Glassmorphic Login Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-box"
      >
        <h2>Welcome Back..!</h2>

        {/* User Selection Dropdown */}
        <motion.select
          whileHover={{ scale: 1.05 }}
          className="user-role"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="technician">Technician</option>
        </motion.select>

        {/* Password Field */}
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Animated Login Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          className="login-button"
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
