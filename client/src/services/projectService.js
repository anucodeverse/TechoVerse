import axios from "axios";

// ===============================
// Axios Instance
// ===============================

const API = axios.create({
  baseURL: import.meta.env.VITE_PROJECT_API,
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
// Get All Projects
// ===============================

export const getProjects = async () => {

  const response =
    await API.get("/");

  return response.data;

};

// ===============================
// Get Single Project
// ===============================

export const getProjectById = async (id) => {

  const response =
    await API.get(`/${id}`);

  return response.data;

};

// ===============================
// Create Project
// ===============================

export const createProject = async (projectData) => {

  const response =
    await API.post("/", projectData);

  return response.data;

};
// ===============================
// Update Project
// ===============================

export const updateProject = async (
  id,
  projectData
) => {

  const response =
    await API.put(
      `/${id}`,
      projectData
    );

  return response.data;

};

// ===============================
// Delete Project
// ===============================

export const deleteProject = async (id) => {

  const response =
    await API.delete(`/${id}`);

  return response.data;

};

// ===============================
// Export Axios Instance
// ===============================

export default API;