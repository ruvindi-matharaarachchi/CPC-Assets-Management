import React, { useState } from "react";
import axios from "axios";

const TechnicianLogin = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });

      if (res.data.role === "technician") {
        localStorage.setItem("technicianId", res.data.technicianId);
        setLoggedInUser(res.data.technicianId);
      } else {
        alert("Access denied");
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Technician Login</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default TechnicianLogin;
