import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { motion } from "framer-motion";
import "./Login.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("technicianId", data.user.id);
      localStorage.setItem("userId", data.user.id); // 🟩 needed for password update
      localStorage.setItem("technicianId", data.user.technicianId); // 🟨 for issue filtering


      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else if (data.user.role === "technician") {
        navigate("/technician-dashboard");
      } else {
        setError("Unknown user role.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="CPC Logo" className="logo" />
        <h1 className="header-title">CPC Head Office</h1>
      </header>

      {/* Background Blur Layer */}
      <div className="background-overlay"></div>

      {/* Login Box */}
      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="login-title">User Login</h2>

        {/* Username Input */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          className="login-input"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password Input */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          className="login-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Error Display */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="login-button"
          onClick={handleSubmit}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
