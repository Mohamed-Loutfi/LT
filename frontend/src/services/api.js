import axios from "axios";

const api = axios.create({
  baseURL: "/api", // passe par le proxy Vite
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Token utilisé:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
