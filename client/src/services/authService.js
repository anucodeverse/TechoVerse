import axios from "axios";

// Backend Base URL
const API = axios.create({
  baseURL: "https://techoverse-fpcd.onrender.com/api/auth",
});

// ================= Register =================
export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// ================= Login =================
export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};

// ================= Get Profile =================
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
