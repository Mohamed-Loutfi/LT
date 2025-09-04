import api from "./api";

// Register user
export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Login user
export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  const token = response.data.token; // backend retourne { "token": "..." }
  localStorage.setItem("token", token); // stocker dans le navigateur
  return token;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};
