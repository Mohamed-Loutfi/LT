import axios from "axios";

const api = axios.create({
  baseURL: "/api", // passe par le proxy vite.config.js
});

// 🔹 Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 403) {
      console.warn("⏰ Token expiré ou invalide → déconnexion");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
