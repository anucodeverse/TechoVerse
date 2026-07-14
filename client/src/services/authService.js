import axios from "axios";

const API = axios.create({
  baseURL: "https://techoverse-fpcd.onrender.com/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// Register
export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};

// Profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default API;
