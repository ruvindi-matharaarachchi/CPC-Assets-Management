import axios from "axios";

export const loginUser = async (username, password) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", { username, password });
  return response.data;
};

export const changePassword = async (userId, newPassword) => {
  return axios.post("http://localhost:5000/api/auth/change-password", { userId, newPassword });
};
