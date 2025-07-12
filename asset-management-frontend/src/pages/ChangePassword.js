import React, { useState } from "react";
import { changePassword } from "../api";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(userId, newPassword);
    alert("Password updated!");
    const role = localStorage.getItem("role");
    navigate(role === "technician" ? "/technician-dashboard" : "/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Change Default Password</h2>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;
