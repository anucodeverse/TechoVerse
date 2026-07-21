import axios from "axios";

// ===============================
// Axios Instance
// ===============================

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

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

// =====================================
// Create Stripe Checkout Session
// =====================================

export const createCheckoutSession = async () => {
  try {
    const response = await API.post(
      "/payment/create-checkout-session"
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// =====================================
// Verify Stripe Payment
// =====================================

export const verifyPayment = async (sessionId) => {
  try {
    const response = await API.post(
      "/payment/verify-payment",
      {
        sessionId,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// ===============================
// Export Axios Instance
// ===============================

export default API;