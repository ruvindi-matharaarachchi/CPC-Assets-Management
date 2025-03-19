import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server Error" };
  }
};
