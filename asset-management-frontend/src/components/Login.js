import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "./Login.css"; // Import CSS file
import logo from "../assets/logo.png";


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
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Header Section */}
      <header className="header">
        <img src={logo} alt="Company Logo" className="logo" />
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/assets">Asset Issues</a></li>
            <li><a href="/technicians">Technicians</a></li>
          </ul>
        </nav>
      </header>

      <div className="login-box">
        <h2>Welcome</h2>

        {/* User Selection Dropdown */}
        <select className="user-role" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="technician">Technician</option>
        </select>

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button onClick={handleSubmit} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;
