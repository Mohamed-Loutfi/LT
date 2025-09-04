import api from "./api";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  if (!data?.token) throw new Error("Token manquant");
  localStorage.setItem("token", data.token);
  return data.token;
};

export const register = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data; // { message: ... }
};
