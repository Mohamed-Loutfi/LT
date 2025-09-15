import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ton backend Spring Boot
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔑 Token utilisé:", token);
  }
  return config;
});

// Intercepteur pour gérer expiration/403
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
