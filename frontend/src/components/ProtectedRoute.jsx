// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // si pas de token, redirige vers login
    return <Navigate to="/login" replace />;
  }

  return children;
}
