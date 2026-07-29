import axios from "axios";

// ===============================
// Axios Instance
// ===============================

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// Request Interceptor
// Automatically Attach JWT Token
// ===============================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// Response Interceptor
// Handle Unauthorized Requests
// ===============================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error.response?.data || error);
  }
);

// ===============================
// Register User
// ===============================

export const registerUser = async (userData) => {

  const response =
    await API.post("/register", userData);

  return response.data;

};

// ===============================
// Login User
// ===============================

export const loginUser = async (userData) => {

  const response =
    await API.post("/login", userData);

  return response.data;

};

// ===============================
// Get Logged-in User Profile
// ===============================

export const getProfile = async () => {

  const response =
    await API.get("/profile");

  return response.data;

};

// ===============================
// Export Axios Instance
// ===============================

export default API;