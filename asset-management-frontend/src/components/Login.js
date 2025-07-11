import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { motion } from "framer-motion";
import "./Login.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState(""); // 🔄 Use actual username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(username, password);

      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("technicianId", data.user.id); // ✅ This is the fix
      // Navigate based on role
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
      <header className="header">
        <img src={logo} alt="Company Logo" className="logo" />
        <h1 className="header-title">CPC Head Office</h1>
      </header>

      <div className="background-overlay"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-box"
      >
        <h2>Welcome</h2>

        {/* 🔑 Username Field */}
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* 🔒 Password Field */}
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

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
