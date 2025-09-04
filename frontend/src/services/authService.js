import api from "./api";

export const login = async (credentials) => {
  console.log("📤 Payload envoyé:", credentials);

  const { data } = await api.post("/auth/login", credentials, {
    headers: { "Content-Type": "application/json" }, // force JSON
  });

  if (!data?.token) throw new Error("Token manquant");

  localStorage.setItem("token", data.token);
  return data.token;
};

export const register = async (payload) => {
  const { data } = await api.post("/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data; // { message: ... }
};

export const logout = () => {
  localStorage.removeItem("token");
};
