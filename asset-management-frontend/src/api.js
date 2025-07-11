// src/api.js
import axios from "axios";

export const loginUser = async (username, password) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    username,
    password,
  });
  return response.data;
};
