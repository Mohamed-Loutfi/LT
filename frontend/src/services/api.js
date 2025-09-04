import axios from "axios";

// Instance Axios avec configuration par défaut
const api = axios.create({
  baseURL: "http://localhost:8080/api", // ton backend Spring Boot
});

// Ajout automatique du token JWT dans chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // récupère le token stocké après login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
