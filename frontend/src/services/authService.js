import api from "./api";

export const login = async (credentials) => {
  localStorage.removeItem("token"); // efface l'ancien token
  const { data } = await api.post("/auth/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });
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
  window.location.href = "/login";
};
