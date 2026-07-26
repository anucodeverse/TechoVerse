import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const generateTasks = async (projectTitle, description) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/ai/suggest`,
    {
      projectTitle,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};